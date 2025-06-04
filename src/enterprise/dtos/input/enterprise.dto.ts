import { IsEmail, IsNotEmpty, IsString, Length, Max } from 'class-validator';

export class EnterpriseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(14,14)
  cnpj: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  @Length(10, 11)
  phone?: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 8)
  password: string;
}
