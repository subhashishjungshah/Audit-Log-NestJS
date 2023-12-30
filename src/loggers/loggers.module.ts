import { Module } from '@nestjs/common';
import { LoggersService } from './loggers.service';
import { BullModule } from '@nestjs/bull';
import { AuditlogsModule } from 'src/auditlogs/auditlogs.module';
import { LoggerProcessor } from './processors/logger.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'LOGGER_QUEUE',
    }),
    AuditlogsModule,
  ],
  providers: [LoggerProcessor, LoggersService],
  exports: [LoggersService],
})
export class LoggersModule {}
