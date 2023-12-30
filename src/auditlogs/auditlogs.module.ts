import { Module } from '@nestjs/common';
import { AuditlogsService } from './auditlogs.service';
import { AuditlogsController } from './auditlogs.controller';

@Module({
  controllers: [AuditlogsController],
  providers: [AuditlogsService],
  exports: [AuditlogsService],
})
export class AuditlogsModule {}
