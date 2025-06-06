import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UserDto } from '../dtos/input/user.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { userPasswordDto } from '../dtos/input/user-password.dto';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { Response } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  async create(@Req() req, @Body() body: UserDto) {
    const token = req.cookies.jwt;
    const decodifyToken = jwt.verify(token,fs.readFileSync('./public.key', 'utf8'),{ algorithms: ['RS256'] },);
    return this._userService.create(body, decodifyToken['ennterpriseId']);
  }

  @Get()
  async findAll() {
    return this._userService.findAll();
  }

  @Put()
  async updatePassword(
    @Req() req,
    @Res() res: Response,
    @Body() body: userPasswordDto,
  ) {
    const token = req.cookies.jwt;
    const decodifyToken = jwt.verify(
      token,
      fs.readFileSync('./public.key', 'utf8'),
      { algorithms: ['RS256'] },
    );
    await this._userService.updatePassword(decodifyToken['id'], body);

    return res.status(204).send();
  }
}
