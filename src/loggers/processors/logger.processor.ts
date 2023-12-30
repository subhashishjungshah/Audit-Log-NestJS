import { OnQueueActive, OnQueueCompleted, Processor, OnQueueFailed, Process } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { AuditlogsService } from 'src/auditlogs/auditlogs.service';

@Injectable()
@Processor('LOGGER_QUEUE')
export class LoggerProcessor {
  private readonly _logger = new Logger(LoggerProcessor.name);
  constructor(private audiLogService: AuditlogsService) {}
  @OnQueueActive()
  public onActive(job: Job) {
    this._logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  public onComplete(job: Job) {
    this._logger.debug(`Completed job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed()
  public onError(job: Job<any>, error: any) {
    this._logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
  }

  @Process('CREATE_LOG')
  public async createLog(job: Job<{ user: string; action: string }>) {
    try {
      this._logger.log(`Logging create log '${job.data.action}'`);
      return this.audiLogService.create({
        company: 'Rusman',
        user: job.data.user,
        action: job.data.action,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
