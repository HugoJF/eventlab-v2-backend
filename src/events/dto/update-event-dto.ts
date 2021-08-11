import {IsOptional} from 'class-validator';
import {Type} from "class-transformer";

export class UpdateEventDto {
    @IsOptional()
    title: string;

    @IsOptional()
    description: string;

    @IsOptional()
    @Type(() => Date)
    starts_at: Date;

    @IsOptional()
    @Type(() => Date)
    ends_at: Date;
}
