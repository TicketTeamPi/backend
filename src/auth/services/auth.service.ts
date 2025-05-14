import { Injectable } from "@nestjs/common";
import { LoginDto } from "../dtos/input/Login.dto";
import { UserRepository } from "src/database/repositories/user-repository";
import { RefreshTokenRepository } from "src/database/repositories/refreshToken-repository";

@Injectable()
export class AuthService {
    constructor(
        private readonly _userRepository: UserRepository,
        private readonly _refreshTokenRepository: RefreshTokenRepository,
    ) {}
    async login(loginDto : LoginDto) {
        
    }

}