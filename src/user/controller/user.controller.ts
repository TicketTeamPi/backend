import { Body, Controller, Post } from "@nestjs/common";
import { UserDto } from "../dtos/input/user.dto";
import { UserService } from "../services/user.service";

@Controller("user")
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Post()
    async create(@Body() body: UserDto) {
        return this._userService.create(body);
    }

}