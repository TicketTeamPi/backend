import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service';
import { EnterpriseController } from './enterprise/controller/enterprise.controller';
import { EnterpriseRepositoryPrisma } from './database/prisma/enterprise-repository-prisma';
import { EnterpriseService } from './enterprise/services/enterprise.service';
import { EnterpriseRepository } from './database/repositories/enterprise-repository';
import { UserRepository } from './database/repositories/user-repository';
import { UserRepositoryPrisma } from './database/prisma/user-repository-prisma';
import { UserController } from './user/controller/user.controller';
import { UserService } from './user/services/user.service';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/services/auth.service';
import { RefreshTokenRepository } from './database/repositories/refresh-token-repository';
import { AuthController } from './auth/controller/auth.controller';
import { RefreshTokenRepositoryPrisma } from './database/prisma/refreshToken-repository-prisma';

@Module({
  imports: [
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      privateKey: process.env.JWT_PRIVATE_KEY,
      publicKey: process.env.JWT_PUBLIC_KEY,
      signOptions: { algorithm: "RS256" },
    }),
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
    EnterpriseService,
    UserService,
    AuthService,
  ],
  controllers: [EnterpriseController, UserController, AuthController],
})
export class AppModule {}
