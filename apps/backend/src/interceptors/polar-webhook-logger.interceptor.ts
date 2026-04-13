import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';
import { PolarPaymentRecord } from '../dtos/entities/polar/polar-payment-record.entity';

@Injectable()
export class PolarWebhookLoggerInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(PolarPaymentRecord)
    private readonly paymentRecordRepo: Repository<PolarPaymentRecord>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request>();
    const body = req.body as Record<string, unknown>;
    const eventType = (body?.type as string) ?? 'unknown';
    const environment = (body?.environment as string) ?? 'unknown';

    return next.handle().pipe(
      tap(async () => {
        const record = this.paymentRecordRepo.create({
          eventType,
          payload: JSON.stringify(body),
          environment,
        });
        await this.paymentRecordRepo.save(record);
      }),
    );
  }
}
