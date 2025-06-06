import { Controller, Body, Post, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/input/Login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const jwt = await this._authService.login(body);
    const refreshToken = await this._authService.createRefreshToken(
      body.email,
      jwt,
    );
    res.cookie('jwt', jwt, {
      httpOnly: true,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
    return res.status(204).json();
  }

  @Post('refresh-token')
  async refreshToken(@Req() req, @Res() res: Response) {
    const token = req.cookies.refreshToken;
    const newJwt = await this._authService.verifyRefreshToken(token);
    if (newJwt) {
      res.cookie('jwt', newJwt, {
        httpOnly: true,
      });
      return res.status(204).send();
    }

    return res.status(401).send();
  }
}
