import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LocalStrategy} from "./local-strategy.service";
import {PassportModule} from "@nestjs/passport";
import {UsersModule} from "../user/users.module";
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        UsersModule, PassportModule, JwtModule.register({
            secret: jwtConstants.secret,
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService, JwtModule],
    controllers: [AuthController]
})
export class AuthModule {
}
