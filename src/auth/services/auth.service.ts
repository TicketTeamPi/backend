import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/input/Login.dto';
import { UserRepository } from '../../database/repositories/user-repository';
import { RefreshTokenRepository } from '../../database/repositories/refresh-token-repository';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '../../user/models/user';
import { UserBdDto } from 'src/user/dtos/input/user.bd.dto';

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
      console.log(loginDto.password, user.password);
      console.log(user);
      throw new Error('Senha incorreta.');
    }

    return this.generateToken(user);
  }

  async generateToken(user: UserBdDto): Promise<string> {
    return this._jwtService.signAsync({
      id: user.id,
      enterpriseId: user.enterpriseId,
      email: user.email,
    });
  }
}
