import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EnterpriseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  cnpj: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  phone?: string;
}
