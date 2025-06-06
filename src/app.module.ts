import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service';
import { EnterpriseController } from './enterprise/controller/enterprise.controller';
import { EnterpriseRepositoryPrisma } from './database/prisma/enterprise-repository-prisma';
import { EnterpriseService } from './enterprise/services/enterprise.service';
import { EnterpriseRepository } from './database/repositories/enterprise-repository';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { TicketRepository } from './database/repositories/ticket-repository';
import { TicketRepositoryPrisma } from './database/prisma/ticket-repository-prisma';
import { TicketService } from './ticket/services/ticket.service';
import { TicketController } from './ticket/controller/ticket.controller';
import * as fs from 'fs';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user/services/user.service';
import { AuthService } from './auth/services/auth.service';
import { RefreshTokenRepository } from './database/repositories/refresh-token-repository';
import { AuthController } from './auth/controller/auth.controller';
import { UserRepository } from './database/repositories/user-repository';
import { UserRepositoryPrisma } from './database/prisma/user-repository-prisma';
import { UserController } from './user/controller/user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './shared/jwt-strategy';
import { RefreshTokenRepositoryPrisma } from './database/prisma/refreshToken-repository-prisma';

@Module({
  imports: [
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      privateKey: fs.readFileSync('./private.key', 'utf-8'),
      publicKey: fs.readFileSync('./public.key', 'utf-8'),
      signOptions: { algorithm: 'RS256' },
    }),
    PassportModule,
  ],
  providers: [
    PrismaService,
    {
      provide: EnterpriseRepository,
      useClass: EnterpriseRepositoryPrisma,
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryPrisma,
    },
    {
      provide: RefreshTokenRepository,
      useClass: RefreshTokenRepositoryPrisma,
    },
    {
      provide: TicketRepository,
      useClass: TicketRepositoryPrisma,
    },
    EnterpriseService,
    UserService,
    AuthService,
    TicketService,
  ],
  controllers: [
    EnterpriseController,
    UserController,
    AuthController,
    TicketController,
    JwtStrategy,
  ],
})
export class AppModule {}
