import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RefreshToken } from '../../auth/models/refreshToken';
import { RefreshTokenRepository } from '../repositories/refresh-token-repository';
import { RefreshTokenDbDto } from 'src/auth/dtos/input/refresh-token-db.dto';

@Injectable()
export class RefreshTokenRepositoryPrisma implements RefreshTokenRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(refreshToken: RefreshToken): Promise<RefreshToken> {
    await this._prismaService.refreshToken.create({
      data: {
        id: refreshToken.id,
        user_id: refreshToken.userId,
        token: refreshToken.refreshToken,
        expires_at: refreshToken.expiresAt,
      },
    });

    return refreshToken;
  }

  async deleteById(id: string): Promise<void> {
    await this._prismaService.refreshToken.delete({
      where: {
        id: id,
      },
    });
  }

  async findById(id: string): Promise<RefreshTokenDbDto | undefined> {
    const refreshToken = await this._prismaService.refreshToken.findFirst({
      where: {
        id: id,
      },
    });

    return refreshToken
      ? new RefreshTokenDbDto(
          refreshToken.id,
          refreshToken.user_id,
          refreshToken.token,
          new Date(refreshToken.expires_at),
        )
      : undefined;
  }

  async update(refreshToken: RefreshTokenDbDto): Promise<void> {
    await this._prismaService.refreshToken.update({
      where: {
        id: refreshToken.id,
      },
      data: {
        user_id: refreshToken.userId,
        token: refreshToken.refreshToken,
        expires_at: refreshToken.expiresAt,
      },
    });
  }
}
