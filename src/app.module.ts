import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { EnterpriseController } from './enterprise/enterprise.controller';

@Module({
  imports: [],
  providers:[PrismaService],
  controllers: [EnterpriseController],
})
export class AppModule {}
