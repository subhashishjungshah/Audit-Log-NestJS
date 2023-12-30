import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable, tap } from 'rxjs';
import { AuditlogsService } from 'src/auditlogs/auditlogs.service';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector, private audiLogService: AuditlogsService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const auditlog = this.reflector.get<string>('AUDIT_LOG_DATA', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return next.handle().pipe(
      tap(async () => {
        const payload = await this.audiLogService.create({
          company: 'Rusman',
          user: user.id,
          action: auditlog,
        });
      }),
    );
  }
}
