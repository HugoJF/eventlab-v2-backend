import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "./local-auth.guard";
import {AuthService} from "./auth.service";
import {RegisterUserDto} from "./dto/register-user-dto";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {UsersService} from "../user/users.service";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService,
        ) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@Request() req) {
        return await this.userService.findOne(req.user.sub);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() body: RegisterUserDto) {
        return await this.authService.register(body)
    }
}
