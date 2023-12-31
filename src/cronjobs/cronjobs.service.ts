import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronjobsService {
  private readonly logger = new Logger(CronjobsService.name);

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'Notify users',
  })
  handleCron() {
    this.logger.debug('Called every 30 seconds');
  }
}
