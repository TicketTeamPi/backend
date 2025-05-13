import { Controller, Body, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../dtos/input/Login.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly _authService: AuthService) {}
    
    @Post("login")
    async login(@Body() body: LoginDto) {
        return this._authService.login(body);
    }
    
    @Post("refresh-token")
    async refreshToken(@Body() body: RefreshTokenDto) {
        return this._authService.refreshToken(body);
    }
}