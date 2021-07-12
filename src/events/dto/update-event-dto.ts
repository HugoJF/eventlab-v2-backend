import {IsOptional} from 'class-validator';

export class UpdateEventDto {
    @IsOptional()
    description: string;

    @IsOptional()
    starts_at: Date;

    @IsOptional()
    ends_at: Date;
}
