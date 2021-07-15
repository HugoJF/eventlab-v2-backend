import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Event} from "./event.entity";
import {EventsController} from "./events.controller";
import {EventsService} from "./events.service";
import {AuthModule} from "../auth/auth.module";
import {UsersModule} from "../user/users.module";
import {PresenceController} from './presence/presence.controller';
import {PresenceService} from "./presence/presence.service";

@Module({
    controllers: [EventsController, PresenceController],
    imports: [TypeOrmModule.forFeature([Event]), AuthModule, UsersModule],
    exports: [TypeOrmModule],
    providers: [PresenceService, EventsService],
})
export class EventsModule {
}
