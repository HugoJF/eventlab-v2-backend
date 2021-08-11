import {IsNotEmpty} from 'class-validator';
import {Type} from "class-transformer";

export class CreateEventDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @Type(() => Date)
    starts_at: Date;

    @IsNotEmpty()
    @Type(() => Date)
    ends_at: Date;
}
