import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuditlogsService {
  constructor(private prisma: PrismaService) {}
  async create(createAuditlogDto: any) {
    const auditLogData = await this.prisma.auditLog.create({
      data: {
        ...createAuditlogDto,
      },
    });
    console.log(auditLogData);
  }

  findAll() {
    const fetchAuditLogs = this.prisma.auditLog.findMany();
    return fetchAuditLogs;
  }
}
