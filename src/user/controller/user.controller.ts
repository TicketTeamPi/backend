import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UserDto } from "../dtos/input/user.dto";
import { UserService } from "../services/user.service";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller("user")
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Post()
    async create(@Body() body: UserDto) {
        return this._userService.create(body);
    }

}