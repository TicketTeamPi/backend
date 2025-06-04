import { Controller, Body, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../dtos/input/Login.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly _authService: AuthService) {}
    
    @Post("login")
    async login(@Body() body: LoginDto, @Res() res: Response) {
        const jwt = await this._authService.login(body);
        res.cookie("jwt", jwt, {
            httpOnly: true
        });
        return res.status(204).json();
    }
    
    // @Post("refresh-token")
    // async refreshToken(@Body() body: RefreshTokenDto) {
    //     return this._authService.refreshToken(body);
    // }
}