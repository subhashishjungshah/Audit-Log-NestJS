import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuditlogsService } from './auditlogs.service';

@Controller('auditlogs')
export class AuditlogsController {
  constructor(private readonly auditlogsService: AuditlogsService) {}

  @Post()
  create(@Body() createAuditlogDto: any) {
    return this.auditlogsService.create(createAuditlogDto);
  }

  @Get()
  findAll() {
    return this.auditlogsService.findAll();
  }
}
