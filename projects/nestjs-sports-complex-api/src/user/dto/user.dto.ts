import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class NewUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class ExistingUserDTO {
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}