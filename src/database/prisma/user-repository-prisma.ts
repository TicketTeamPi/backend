import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '../../user/models/user';
import { UserRepository } from '../repositories/user-repository';
import { UserBdDto } from 'src/user/dtos/input/user.bd.dto';

@Injectable()
export class UserRepositoryPrisma implements UserRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(user: User): Promise<User> {
    await this._prismaService.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        enterprise_id: user.enterpriseId,
        refresh_token_id: user.refreshToken,
        role: user.role,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<UserBdDto | undefined> {
    const user = await this._prismaService.user.findFirst({
      where: {
        email,
      },
    });

        return user
            ? new UserBdDto(
                user.id,
                user.name,
                user.email,
                user.password,
                user.enterprise_id,
                user.refresh_token_id ? user.refresh_token_id : undefined
            )
            : undefined;
    }

    async update(user: User): Promise<void> {
        await this._prismaService.user.update({
            where: {
                id: user.id,
            },
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                enterprise_id: user.enterpriseId,
                refresh_token_id: user.refreshToken
            },
        });
    }

    async findById(id: string): Promise<UserBdDto | undefined> {
        const user = await this._prismaService.user.findUnique({
            where: {
                id,
            },
        });

        return user
            ? new UserBdDto(
                user.id,
                user.name,
                user.email,
                user.password,
                user.enterprise_id,
                user.refresh_token_id ? user.refresh_token_id : undefined
            )
            : undefined;
    }
}
