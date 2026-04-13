## Polar Integration

- Rewrite the /home/x64/Documents/Startup/polarkit/apps/spa/src/views/integrations/polar/index.vue user-interface to accept both the following fields:
    - `oat` (string, required): The OAT (OAuth Access Token) for Polar integration.
    - `webhookUrl` (string, required): The Webhook URL for Polar integration.
    - `enabled` (boolean, optional): A flag to enable or disable the Polar integration. Default is `false`.
    -  webhook events should render a checkbox list of the following events:
          - checkout.created
          - checkout.updated
          - checkout.expired
          - customer.created
          - customer.updated
          - customer.deleted
          - customer.state_changed
          - customer_seat.assigned
          - customer_seat.claimed
          - customer_seat.revoked
          - member.created
          - member.updated
          - member.deleted
          - order.created
          - order.updated
          - order.paid
          - order.refunded
          - subscription.created
          - subscription.updated
          - subscription.active
          - subscription.canceled
          - subscription.uncanceled
          - subscription.revoked
          - subscription.past_due
          - refund.created
          - refund.updated
          - product.created
          - product.updated
          - benefit.created
          - benefit.updated
          - benefit_grant.created
          - benefit_grant.cycled
          - benefit_grant.updated
          - benefit_grant.revoked
          - organization.updated
       
    - Toggling between live and test should be supported, allowing users to switch between environments for testing and production purposes.

 ## NestJS Integration

    - Create the neccessary entities, services, and controllers in the NestJS backend to handle the Polar integration. This includes:
    - An entity to store the Polar integration settings (OAT, Webhook URL, enabled status, and selected events).
    - A service to manage the integration settings and handle incoming webhook events from Polar.
    - A controller to expose endpoints for updating the integration settings and receiving webhook events from Polar.
    - Implement in Guard in NestJS module that checks the following:
        - The Chrome Webstore PublisherID is set along with the clientID and secret and refresh token encaspulate this in a ChromeWebService::isCredentialSet() method.
        - If the OAT is valid and the integration is enabled, allow the request to proceed; otherwise, reject the request with an appropriate error response.
    - Polar Payment Record: Create a new entity to store payment records received from Polar webhooks, including details such as the event type, payload, and timestamp. Implement a service to handle the creation and retrieval of these payment records for auditing and troubleshooting purposes.