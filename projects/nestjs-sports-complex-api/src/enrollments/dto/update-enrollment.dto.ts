import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEnrollmentDto {
    @IsString()
    @IsNotEmpty()
    userId: string;
    @IsString()
    @IsNotEmpty()
    classId: string;
}
