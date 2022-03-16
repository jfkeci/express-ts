import { IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordParamsDTO {
    @IsString()
    @IsNotEmpty()
    id: string;
    @IsString()
    @IsNotEmpty()
    passwordResetCode: string;
}

export class ResetPasswordBodyDTO {
    @IsString()
    @IsNotEmpty()
    password: string;
}