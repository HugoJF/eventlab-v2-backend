import {Equals, IsEmail, IsNotEmpty, MinLength} from 'class-validator';
import {Match} from "../../decorators/match.decorator";

export class RegisterUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @Match('password')
    password_confirmation: string;
}
