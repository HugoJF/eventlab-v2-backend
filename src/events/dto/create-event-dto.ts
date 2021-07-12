import {IsNotEmpty} from 'class-validator';
import {Column} from "typeorm";

export class CreateEventDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @Column()
    starts_at: Date;

    @Column()
    ends_at: Date;
}
