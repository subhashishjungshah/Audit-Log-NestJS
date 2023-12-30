import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable, tap } from 'rxjs';
import { LoggersService } from 'src/loggers/loggers.service';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector, private loggerService: LoggersService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const auditlog = this.reflector.get<string>('AUDIT_LOG_DATA', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return next.handle().pipe(
      tap(async () => {
        this.loggerService.createLog({ user: user?.email, action: auditlog });
      }),
    );
  }
}
