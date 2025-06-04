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
import * as fs from "fs";
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/services/auth.service';
import { RefreshTokenRepository } from './database/repositories/refresh-token-repository';
import { AuthController } from './auth/controller/auth.controller';
import { RefreshTokenRepositoryPrisma } from './database/prisma/refresh-token-repository-prisma'; // Supondo que exista

@Module({
  imports: [
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      privateKey: fs.readFileSync("./private.key", "utf-8"),
      publicKey: fs.readFileSync("./public.key", "utf-8"),
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
