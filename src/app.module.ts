import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from "./user/users.module";
import {EventsModule} from "./events/events.module";
import {AuthModule} from './auth/auth.module';
import ormconfig from "../ormconfig";

@Module({
    imports: [
        TypeOrmModule.forRoot(ormconfig),
        UsersModule,
        EventsModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
