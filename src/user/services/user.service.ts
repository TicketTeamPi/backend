import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user-repository';
import { UserDto } from '../dtos/input/user.dto';
import { StringHelper } from '../../helpers/string-helper';
import { User, UserRole } from '../models/user';
import { UserMapper } from '../dtos/user.mapper';
import { UserResponse } from '../dtos/output/user.response';
import { EmailService } from 'src/email/services/email.service';

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository,
  private readonly _emailService: EmailService) {}

  async create(userDto: UserDto): Promise<UserResponse> {
    const emailIsAlreadyInUse = await this._userRepository.findByEmail(
      userDto.email,
    );

    if (emailIsAlreadyInUse) {
      throw new Error('O email já está sendo usuado');
    }

    const password = StringHelper.generateRandomString(8);
    const user = UserMapper.toUser(userDto, password, UserRole.USER);

    await this._userRepository.create(user);

    const response = UserMapper.toUserResponse(user);

    await this._emailService.sendCredentials({
      email: response.email,
      name: response.name,
      password 
    });

    return response;
  }
}
