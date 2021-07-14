import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Event} from "./event.entity";
import {EventsController} from "./events.controller";
import {EventsService} from "./events.service";
import {AuthModule} from "../auth/auth.module";
import {UsersModule} from "../user/users.module";

@Module({
    controllers: [EventsController],
    imports: [TypeOrmModule.forFeature([Event]), AuthModule, UsersModule],
    exports: [TypeOrmModule],
    providers: [EventsService],
})
export class EventsModule {
}
