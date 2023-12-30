import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuditlogsModule } from 'src/auditlogs/auditlogs.module';

import { LoggersModule } from 'src/loggers/loggers.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [AuditlogsModule, LoggersModule],
})
export class UsersModule {}
