import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { jobOptions } from 'src/mailer/config/bullOptions';

@Injectable()
export class LoggersService {
  private readonly _logger = new Logger(LoggersService.name);
  constructor(@InjectQueue('LOGGER_QUEUE') private readonly _loggerQueue: Queue) {}
  public async createLog({ user, action }: { user: string; action: string }): Promise<void> {
    try {
      await this._loggerQueue.add(
        'CREATE_LOG',
        {
          user,
          action,
        },
        jobOptions,
      );
    } catch (error) {
      this._logger.error(`Error creating log for ${action}`);
      throw error;
    }
  }
}
