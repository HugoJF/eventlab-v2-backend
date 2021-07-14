import {IsDate, IsDateString, IsNotEmpty, MinDate} from 'class-validator';

export class CreateEventDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsDateString()
    starts_at: Date;

    @IsNotEmpty()
    @IsDateString()
    ends_at: Date;
}
