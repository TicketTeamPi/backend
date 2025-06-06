import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/input/Login.dto';
import { UserRepository } from '../../database/repositories/user-repository';
import { RefreshTokenRepository } from '../../database/repositories/refresh-token-repository';
import { JwtService } from '@nestjs/jwt';
import { UserBdDto } from 'src/user/dtos/input/user.bd.dto';
import { RefreshToken } from '../models/refreshToken';
import { UserMapper } from 'src/user/dtos/user.mapper';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _refreshTokenRepository: RefreshTokenRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
    const user = await this._userRepository.findByEmail(loginDto.email);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    if (user.password !== loginDto.password) {
      throw new Error('Senha incorreta.');
    }

    return await this.generateToken(user);
  }

  async refreshToken(id: string): Promise<string> {
    const refreshToken = await this._refreshTokenRepository.findById(id);
    let token: string;

    if (refreshToken) {
      if (refreshToken.expiresAt > new Date()) {
        const user = await this._userRepository.findById(refreshToken.userId);
        if (user) {
          token = await this.generateToken(user);
          refreshToken.refreshToken = token;
          await this._refreshTokenRepository.update(refreshToken);
        }
      } else {
        await this._refreshTokenRepository.deleteById(refreshToken.id);
      }
    }

    return token;
  }

  private async generateToken(user: UserBdDto): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this._jwtService.signAsync(payload);
  }
}
