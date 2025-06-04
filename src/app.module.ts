import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service';
import { EnterpriseController } from './enterprise/controller/enterprise.controller';
import { EnterpriseRepositoryPrisma } from './database/prisma/enterprise-repository-prisma';
import { EnterpriseService } from './enterprise/services/enterprise.service';
import { EnterpriseRepository } from './database/repositories/enterprise-repository';
import * as fs from "fs";
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

@Module({
  imports: [
    JwtModule.register({
      privateKey: fs.readFileSync("./private.key", "utf-8"),
      publicKey: fs.readFileSync("./public.key", "utf-8"),
      signOptions: {algorithm: "RS256"}
    }),
    PassportModule
  ],
  providers: [
    PrismaService,
    {
      provide: EnterpriseRepository,
      useClass: EnterpriseRepositoryPrisma,
    },
    {
      provide: RefreshTokenRepository,
      useClass: EnterpriseRepositoryPrisma,
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryPrisma
    },
    EnterpriseService,
    UserService,
    AuthService,
    JwtStrategy
  ],
  controllers: [EnterpriseController, AuthController, UserController],
})
export class AppModule { }
