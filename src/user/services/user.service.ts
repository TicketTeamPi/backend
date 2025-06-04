import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user-repository';
import { UserDto } from '../dtos/input/user.dto';
import { StringHelper } from '../../helpers/string-helper';
import { UserMapper } from '../dtos/user.mapper';
import { EmailService } from 'src/email/services/email.service';
import { UserResponseDto } from '../dtos/output/userResponse.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _emailService: EmailService,
  ) {}

  async create(userDto: UserDto): Promise<UserResponseDto> {
    const emailIsAlreadyInUse = await this._userRepository.findByEmail(
      userDto.email,
    );

    if (emailIsAlreadyInUse) {
      throw new Error('O email já está sendo usuado');
    }

    const password = StringHelper.generateRandomString(8);
    const user = UserMapper.toUser(userDto, 'XD', 'USER');

    await this._userRepository.create(user);

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
          role: user.role,
        }),
    );
  }
}
