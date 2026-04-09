import { Injectable, Logger } from '@nestjs/common';

import type { IncomingHttpHeaders } from 'http';
import {
  validateEvent,
  WebhookVerificationError,
} from '@polar-sh/sdk/webhooks';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseCustomerCollections } from '../../dtos/firebase/collections/FirebaseCustomerCollections';

type PolarWebhookEvent = ReturnType<typeof validateEvent>;

@Injectable()
export class PolarEventHandler {
  private readonly logger = new Logger(PolarEventHandler.name);

  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   * Validates the webhook signature and dispatches to the appropriate handler.
   *
   * @param rawBody  Raw request body as a string or Buffer (must be unparsed)
   * @param headers  Request headers (used by Polar SDK to read the signature)
   * @param secret   Webhook secret configured in the Polar dashboard
   */
  async handleEvent(
    rawBody: string | Buffer,
    headers: IncomingHttpHeaders | Record<string, string>,
    secret: string,
  ): Promise<void> {
    const normalizedHeaders = this.normalizeHeaders(headers);

    let event: PolarWebhookEvent;
    try {
      const webHookId = this.normalizeHeaders(headers)['webhook-id'];
      if (await this.firebaseService.checkIfWebhookProcessed(webHookId)) {
        this.logger.warn(`Duplicate webhook received with ID: ${webHookId}`);
        return;
      }
      event = validateEvent(rawBody, normalizedHeaders, secret);
      await this.firebaseService.saveWebhooksEvent(webHookId, event);
    } catch (err) {
      if (err instanceof WebhookVerificationError) {
        this.logger.warn(
          `Webhook signature verification failed: ${err.message}`,
        );
        throw err;
      }
      throw err;
    }

    this.logger.log(`Received Polar webhook event: ${event.type}`);
    await this.dispatch(event);
  }

  private async dispatch(event: PolarWebhookEvent): Promise<void> {
    switch (event.type) {
      // ── Checkout ────────────────────────────────────────────────────────────
      case 'checkout.created':
        return this.onCheckoutCreated(event);
      case 'checkout.updated':
        return this.onCheckoutUpdated(event);
      case 'checkout.expired':
        return this.onCheckoutExpired(event);

      // ── Order ───────────────────────────────────────────────────────────────
      case 'order.created':
        return this.onOrderCreated(event);
      case 'order.updated':
        return this.onOrderUpdated(event);
      case 'order.paid':
        return this.onOrderPaid(event);
      case 'order.refunded':
        return this.onOrderRefunded(event);

      // ── Subscription ────────────────────────────────────────────────────────
      case 'subscription.created':
        return this.onSubscriptionCreated(event);
      case 'subscription.updated':
        return this.onSubscriptionUpdated(event);
      case 'subscription.active':
        return this.onSubscriptionActive(event);
      case 'subscription.canceled':
        return this.onSubscriptionCanceled(event);
      case 'subscription.uncanceled':
        return this.onSubscriptionUncanceled(event);
      case 'subscription.revoked':
        return this.onSubscriptionRevoked(event);
      case 'subscription.past_due':
        return this.onSubscriptionPastDue(event);

      // ── Customer ────────────────────────────────────────────────────────────
      case 'customer.created':
        return this.onCustomerCreated(event);
      case 'customer.updated':
        return this.onCustomerUpdated(event);
      case 'customer.deleted':
        return this.onCustomerDeleted(event);
      case 'customer.state_changed':
        return this.onCustomerStateChanged(event);

      // ── Customer Seat ───────────────────────────────────────────────────────
      case 'customer_seat.assigned':
        return this.onCustomerSeatAssigned(event);
      case 'customer_seat.claimed':
        return this.onCustomerSeatClaimed(event);
      case 'customer_seat.revoked':
        return this.onCustomerSeatRevoked(event);

      // ── Benefit ─────────────────────────────────────────────────────────────
      case 'benefit.created':
        return this.onBenefitCreated(event);
      case 'benefit.updated':
        return this.onBenefitUpdated(event);

      // ── Benefit Grant ────────────────────────────────────────────────────────
      case 'benefit_grant.created':
        return this.onBenefitGrantCreated(event);
      case 'benefit_grant.updated':
        return this.onBenefitGrantUpdated(event);
      case 'benefit_grant.cycled':
        return this.onBenefitGrantCycled(event);
      case 'benefit_grant.revoked':
        return this.onBenefitGrantRevoked(event);

      // ── Product ─────────────────────────────────────────────────────────────
      case 'product.created':
        return this.onProductCreated(event);
      case 'product.updated':
        return this.onProductUpdated(event);

      // ── Refund ──────────────────────────────────────────────────────────────
      case 'refund.created':
        return this.onRefundCreated(event);
      case 'refund.updated':
        return this.onRefundUpdated(event);

      // ── Organization ────────────────────────────────────────────────────────
      case 'organization.updated':
        return this.onOrganizationUpdated(event);

      // ── Member ──────────────────────────────────────────────────────────────
      case 'member.created':
        return this.onMemberCreated(event);
      case 'member.updated':
        return this.onMemberUpdated(event);
      case 'member.deleted':
        return this.onMemberDeleted(event);

      default:
        this.logger.warn(
          `Unhandled Polar event type: ${(event as { type: string }).type}`,
        );
    }
  }

  // ── Checkout handlers ──────────────────────────────────────────────────────

  protected async onCheckoutCreated(
    event: Extract<PolarWebhookEvent, { type: 'checkout.created' }>,
  ): Promise<void> {
    this.logger.log(`checkout.created: ${event.data.id}`);
  }

  protected async onCheckoutUpdated(
    event: Extract<PolarWebhookEvent, { type: 'checkout.updated' }>,
  ): Promise<void> {
    this.logger.log(`checkout.updated: ${event.data.id}`);
  }

  protected async onCheckoutExpired(
    event: Extract<PolarWebhookEvent, { type: 'checkout.expired' }>,
  ): Promise<void> {
    this.logger.log(`checkout.expired: ${event.data.id}`);
  }

  // ── Order handlers ─────────────────────────────────────────────────────────

  protected async onOrderCreated(
    event: Extract<PolarWebhookEvent, { type: 'order.created' }>,
  ): Promise<void> {
    const { id, customer, subscriptionId, status } = event.data;
    const extensionId = (customer.externalId ??
      customer.metadata?.extensionId ??
      '') as string;
    const docId = `${customer.id}@${extensionId}`;

    const customerData: FirebaseCustomerCollections = {
      premium: true,
      subscriptionId: subscriptionId ?? id,
      status,
      cancelAtPeriodEnd: null as unknown as Date,
      currentPeriodEnd: null as unknown as Date,
      updatedAt: new Date(),
      lastWebhookEvent: 'order.created',
      extensionId,
      checkoutSessions: null,
    };

    await this.firebaseService.saveCustomer(docId, customerData);
    this.logger.log(`order.created: saved customer ${docId}`);
  }

  protected async onOrderUpdated(
    event: Extract<PolarWebhookEvent, { type: 'order.updated' }>,
  ): Promise<void> {
    this.logger.log(`order.updated: ${event.data.id}`);
  }

  protected async onOrderPaid(
    event: Extract<PolarWebhookEvent, { type: 'order.paid' }>,
  ): Promise<void> {
    this.logger.log(`order.paid: ${event.data.id}`);
  }

  protected async onOrderRefunded(
    event: Extract<PolarWebhookEvent, { type: 'order.refunded' }>,
  ): Promise<void> {
    this.logger.log(`order.refunded: ${event.data.id}`);
  }

  // ── Subscription handlers ──────────────────────────────────────────────────

  protected async onSubscriptionCreated(
    event: Extract<PolarWebhookEvent, { type: 'subscription.created' }>,
  ): Promise<void> {
    this.logger.log(`subscription.created: ${event.data.id}`);
  }

  protected async onSubscriptionUpdated(
    event: Extract<PolarWebhookEvent, { type: 'subscription.updated' }>,
  ): Promise<void> {
    this.logger.log(`subscription.updated: ${event.data.id}`);
  }

  protected async onSubscriptionActive(
    event: Extract<PolarWebhookEvent, { type: 'subscription.active' }>,
  ): Promise<void> {
    this.logger.log(`subscription.active: ${event.data.id}`);
  }

  protected async onSubscriptionCanceled(
    event: Extract<PolarWebhookEvent, { type: 'subscription.canceled' }>,
  ): Promise<void> {
    this.logger.log(`subscription.canceled: ${event.data.id}`);
  }

  protected async onSubscriptionUncanceled(
    event: Extract<PolarWebhookEvent, { type: 'subscription.uncanceled' }>,
  ): Promise<void> {
    this.logger.log(`subscription.uncanceled: ${event.data.id}`);
  }

  protected async onSubscriptionRevoked(
    event: Extract<PolarWebhookEvent, { type: 'subscription.revoked' }>,
  ): Promise<void> {
    this.logger.log(`subscription.revoked: ${event.data.id}`);
  }

  protected async onSubscriptionPastDue(
    event: Extract<PolarWebhookEvent, { type: 'subscription.past_due' }>,
  ): Promise<void> {
    this.logger.log(`subscription.past_due: ${event.data.id}`);
  }

  // ── Customer handlers ──────────────────────────────────────────────────────

  protected async onCustomerCreated(
    event: Extract<PolarWebhookEvent, { type: 'customer.created' }>,
  ): Promise<void> {
    this.logger.log(`customer.created: ${event.data.id}`);
  }

  protected async onCustomerUpdated(
    event: Extract<PolarWebhookEvent, { type: 'customer.updated' }>,
  ): Promise<void> {
    this.logger.log(`customer.updated: ${event.data.id}`);
  }

  protected async onCustomerDeleted(
    event: Extract<PolarWebhookEvent, { type: 'customer.deleted' }>,
  ): Promise<void> {
    this.logger.log(`customer.deleted: ${event.data.id}`);
  }

  protected async onCustomerStateChanged(
    event: Extract<PolarWebhookEvent, { type: 'customer.state_changed' }>,
  ): Promise<void> {
    this.logger.log(`customer.state_changed: ${event.data.id}`);
  }

  // ── Customer Seat handlers ─────────────────────────────────────────────────

  protected async onCustomerSeatAssigned(
    event: Extract<PolarWebhookEvent, { type: 'customer_seat.assigned' }>,
  ): Promise<void> {
    this.logger.log(`customer_seat.assigned: ${JSON.stringify(event.data)}`);
  }

  protected async onCustomerSeatClaimed(
    event: Extract<PolarWebhookEvent, { type: 'customer_seat.claimed' }>,
  ): Promise<void> {
    this.logger.log(`customer_seat.claimed: ${JSON.stringify(event.data)}`);
  }

  protected async onCustomerSeatRevoked(
    event: Extract<PolarWebhookEvent, { type: 'customer_seat.revoked' }>,
  ): Promise<void> {
    this.logger.log(`customer_seat.revoked: ${JSON.stringify(event.data)}`);
  }

  // ── Benefit handlers ───────────────────────────────────────────────────────

  protected async onBenefitCreated(
    event: Extract<PolarWebhookEvent, { type: 'benefit.created' }>,
  ): Promise<void> {
    this.logger.log(`benefit.created: ${event.data.id}`);
  }

  protected async onBenefitUpdated(
    event: Extract<PolarWebhookEvent, { type: 'benefit.updated' }>,
  ): Promise<void> {
    this.logger.log(`benefit.updated: ${event.data.id}`);
  }

  // ── Benefit Grant handlers ─────────────────────────────────────────────────

  protected async onBenefitGrantCreated(
    event: Extract<PolarWebhookEvent, { type: 'benefit_grant.created' }>,
  ): Promise<void> {
    this.logger.log(`benefit_grant.created: ${event.data.id}`);
  }

  protected async onBenefitGrantUpdated(
    event: Extract<PolarWebhookEvent, { type: 'benefit_grant.updated' }>,
  ): Promise<void> {
    this.logger.log(`benefit_grant.updated: ${event.data.id}`);
  }

  protected async onBenefitGrantCycled(
    event: Extract<PolarWebhookEvent, { type: 'benefit_grant.cycled' }>,
  ): Promise<void> {
    this.logger.log(`benefit_grant.cycled: ${event.data.id}`);
  }

  protected async onBenefitGrantRevoked(
    event: Extract<PolarWebhookEvent, { type: 'benefit_grant.revoked' }>,
  ): Promise<void> {
    this.logger.log(`benefit_grant.revoked: ${event.data.id}`);
  }

  // ── Product handlers ───────────────────────────────────────────────────────

  protected async onProductCreated(
    event: Extract<PolarWebhookEvent, { type: 'product.created' }>,
  ): Promise<void> {
    this.logger.log(`product.created: ${event.data.id}`);
  }

  protected async onProductUpdated(
    event: Extract<PolarWebhookEvent, { type: 'product.updated' }>,
  ): Promise<void> {
    this.logger.log(`product.updated: ${event.data.id}`);
  }

  // ── Refund handlers ────────────────────────────────────────────────────────

  protected async onRefundCreated(
    event: Extract<PolarWebhookEvent, { type: 'refund.created' }>,
  ): Promise<void> {
    this.logger.log(`refund.created: ${event.data.id}`);
  }

  protected async onRefundUpdated(
    event: Extract<PolarWebhookEvent, { type: 'refund.updated' }>,
  ): Promise<void> {
    this.logger.log(`refund.updated: ${event.data.id}`);
  }

  // ── Organization handlers ──────────────────────────────────────────────────

  protected async onOrganizationUpdated(
    event: Extract<PolarWebhookEvent, { type: 'organization.updated' }>,
  ): Promise<void> {
    this.logger.log(`organization.updated: ${event.data.id}`);
  }

  // ── Member handlers ────────────────────────────────────────────────────────

  protected async onMemberCreated(
    event: Extract<PolarWebhookEvent, { type: 'member.created' }>,
  ): Promise<void> {
    this.logger.log(`member.created: ${JSON.stringify(event.data)}`);
  }

  protected async onMemberUpdated(
    event: Extract<PolarWebhookEvent, { type: 'member.updated' }>,
  ): Promise<void> {
    this.logger.log(`member.updated: ${JSON.stringify(event.data)}`);
  }

  protected async onMemberDeleted(
    event: Extract<PolarWebhookEvent, { type: 'member.deleted' }>,
  ): Promise<void> {
    this.logger.log(`member.deleted: ${JSON.stringify(event.data)}`);
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  private normalizeHeaders(
    headers: IncomingHttpHeaders | Record<string, string>,
  ): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(headers)) {
      if (value !== undefined) {
        result[key.toLowerCase()] = Array.isArray(value) ? value[0] : value;
      }
    }
    return result;
  }
}
