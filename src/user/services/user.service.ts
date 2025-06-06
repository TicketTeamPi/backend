import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user-repository';
import { UserResponseDto } from '../dtos/output/userResponse.dto';
import { UserDto } from '../dtos/input/user.dto';
import { StringHelper } from '../../helpers/string-helper';
import { UserMapper } from '../dtos/user.mapper';
import { EmailService } from '../../email/services/email.service';
import { userPasswordDto } from '../dtos/input/user-password.dto';
import { SectorRepository } from '../../database/repositories/sector-repository';

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _emailService: EmailService,
    private readonly _sectorRepository: SectorRepository
  ) {}

  async create(userDto: UserDto, enterpriseId: string): Promise<UserResponseDto> {
    const emailIsAlreadyInUse = await this._userRepository.findByEmail(
      userDto.email,
    );

    if (emailIsAlreadyInUse) {
      throw new Error('O email já está sendo usuado');
    }

    const password = StringHelper.generateRandomString(8);
    const user = UserMapper.toUser(
      userDto,
      userDto.enterpriseId,
      password,
    );

    await this._userRepository.create(user);

    await this._sectorRepository.create(userDto.sector, enterpriseId);

    const response = UserMapper.toUserResponseDto(user);

    await this._emailService.sendCredentials({
      email: response.email,
      name: response.name,
      password,
    });

    return response;
  }

  async findAll(): Promise<UserResponseDto[]> {
    const userDtos = await this._userRepository.findAll();
    return userDtos.map(
      (user) =>
        new UserResponseDto({
          id: user.id,
          name: user.name,
          email: user.email,
          enterpriseId: user.enterpriseId,
          role: user.sector,
        }),
    );
  }

  async updatePassword(id: string, dto: userPasswordDto): Promise<void> {
    const user = await this._userRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    if (user.password !== dto.currentPassword) {
      throw new Error('Senha atual incorreta.');
    }
    user.password = dto.newPassword;
    await this._userRepository.update(UserMapper.toUserfromBdDto(user));
  }
}
