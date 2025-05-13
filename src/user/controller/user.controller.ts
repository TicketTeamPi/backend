import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/input/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('/register')
  async register(@Body() userDto: UserDto) {
    return this._userService.create(userDto);
  }
}
