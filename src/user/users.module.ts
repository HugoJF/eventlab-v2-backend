import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user.entity';
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";

@Module({
    controllers: [UsersController],
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule, UsersService],
    providers: [UsersService],
})
export class UsersModule {
}
