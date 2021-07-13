import {ConflictException, Injectable} from '@nestjs/common';
import {UsersService} from "../user/users.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../user/user.entity";
import {RegisterUserDto} from "./dto/register-user-dto";

@Injectable()
export class AuthService {
    constructor(
        private users: UsersService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.users.findByEmail(username);
        if (user && user.api_token === pass) {
            // TODO: class transformer should take care of this
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = {username: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(body: RegisterUserDto) {
        const exists = await this.users.findByEmail(body.email);

        if (exists) {
            throw new ConflictException()
        }

        return this.users.create({
            name: body.name,
            email: body.email,
            password: body.password,
        })
    }
}
