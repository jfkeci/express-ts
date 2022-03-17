import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRatingDto {
    @IsString()
    @IsNotEmpty()
    text: string;
    @IsNumber()
    @IsNotEmpty()
    rating: number;
    @IsString()
    @IsNotEmpty()
    userId: string;
    @IsString()
    @IsNotEmpty()
    classId: string;
}
