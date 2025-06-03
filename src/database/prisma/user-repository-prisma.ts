import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { User } from "../../user/models/user";
import { UserRepository } from "../repositories/user-repository";

@Injectable()
export class UserRepositoryPrisma implements UserRepository {
    constructor(private readonly _prismaService: PrismaService) { }

    async create(user: User): Promise<User> {
        await this._prismaService.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                enterprise_id: user.enterpriseId,
                refresh_token_id: user.refreshToken
            },
        });

        return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this._prismaService.user.findFirst({
            where: {
                email,
            },
        });

        return user
            ? new User(
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