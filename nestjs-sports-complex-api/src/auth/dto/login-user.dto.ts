import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDTO {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}