import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mailer/mailer.service';

@Injectable()
export class CronjobsService {
  private readonly logger = new Logger(CronjobsService.name);
  constructor(private prisma: PrismaService, private mailService: MailService) {}

  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'Automated monthly-notification',
  })
  async handleCron() {
    this.logger.debug('Called every 10 seconds');
    const users = await this.prisma.user.findMany({ where: { isActive: true } });
    for (const user of users) {
      // this.mailService.welcome({ email: user?.email, name: user?.name });
      console.log(user.email);
    }
  }
}
