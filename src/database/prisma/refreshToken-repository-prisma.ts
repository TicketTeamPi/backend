import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { RefreshToken } from "../../auth/models/refreshToken";
import { RefreshTokenRepository } from "../repositories/refresh-token-repository";

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
}