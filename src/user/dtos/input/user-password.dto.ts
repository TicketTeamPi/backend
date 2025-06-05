import { IsNotEmpty, IsString } from "class-validator";

export class userPasswordDto {
    @IsString()
    @IsNotEmpty()
    currentPassword: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;
}