import { Injectable } from "@nestjs/common";
import { LoginDto } from "../dtos/input/Login.dto";
import { UserRepository } from "../../database/repositories/user-repository";
import { RefreshTokenRepository } from "../../database/repositories/refresh-token-repository";
import { JwtService } from "@nestjs/jwt";
import { UserBdDto } from "src/user/dtos/input/user.bd.dto";
import { RefreshToken } from "../models/refreshToken";
import { UserMapper } from "src/user/dtos/user.mapper";

@Injectable()
export class AuthService {
    constructor(
        private readonly _userRepository: UserRepository,
        private readonly _refreshTokenRepository: RefreshTokenRepository,
        private readonly _jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto): Promise<string> {
        const user = await this._userRepository.findByEmail(loginDto.email);

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
        if (user.password !== loginDto.password) {
            throw new Error("Senha incorreta.");
        }

        return await this.generateToken(user);
    }

    async generateToken(user: UserBdDto): Promise<string> {
        return this._jwtService.signAsync({
            id: user.id,
            enterpriseId: user.enterpriseId,
            email: user.email,
        });
    }

    async createRefreshToken(email: string, cookieJwt: string): Promise<string> {
        const userBdDto = await this._userRepository.findByEmail(email);
        if (!userBdDto) {
            throw new Error("Usuário não encontrado.");
        }
        if (userBdDto.refreshToken) {
            await this._refreshTokenRepository.deleteById(userBdDto.refreshToken);
        }
        const createdRT = await this._refreshTokenRepository.create(new RefreshToken(userBdDto.id, cookieJwt, new Date(Date.now() + 24 * 60 * 60 * 1000)));
        userBdDto.refreshToken = createdRT.id;
        const user = UserMapper.toUserfromBdDto(userBdDto);

        await this._userRepository.update(user);

        return createdRT.id;
    }

    async refreshToken(id: string): Promise<string> {
        const refreshToken = await this._refreshTokenRepository.findById(id);
        var token;
        if (refreshToken) {
            if (refreshToken?.expiresAt > new Date(Date.now())) {
                const user = await this._userRepository.findById(refreshToken.userId);
                if(user) {
                    token = await this.generateToken(user);
                    refreshToken.refreshToken = token;
                    await this._refreshTokenRepository.update(refreshToken);
                }
            }
            else {
                await this._refreshTokenRepository.deleteById(refreshToken.id);
            }
        }


        return token;
    }

}