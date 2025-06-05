import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../database/repositories/user-repository";
import { UserDto } from "../dtos/input/user.dto";
import { UserResponseDto } from "../dtos/output/userResponse.dto";
import { UserMapper } from "../dtos/user.mapper";
import { userPasswordDto } from "../dtos/input/user-password.dto";

@Injectable()
export class UserService {
    constructor(private readonly _userRepository: UserRepository) {}

    async create(dto: UserDto): Promise<UserResponseDto>{
        var user = await this._userRepository.findByEmail(dto.email);
        if(user){
            throw new Error("já existe um usuário com esse email.");
        }
        user = UserMapper.toUser(dto, "XD");
        const userCreated = await this._userRepository.create(user);
        
        return UserMapper.toUserResponseDto(userCreated);
    } 
    async updatePassword(id: string, dto: userPasswordDto): Promise<void> {
        const user = await this._userRepository.findById(id);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
        if (user.password !== dto.currentPassword) {
            throw new Error("Senha atual incorreta.");
        }
        user.password = dto.newPassword;
        await this._userRepository.update(UserMapper.toUserfromBdDto(user));
    }
}