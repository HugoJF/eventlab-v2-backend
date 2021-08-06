import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {UsersModule} from "./user/users.module";
import {EventsModule} from "./events/events.module";
import {AuthModule} from './auth/auth.module';
import {Event} from "./events/event.entity";
import {User} from "./user/user.entity";

const TYPEORM_CONFIG: TypeOrmModuleOptions = {
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: +process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "secret",
    database: process.env.DB_DATABASE || "eventlab",
    entities: [Event, User],
    synchronize: true, // TODO: use migrations
    // logging: ["query"]
}

@Module({
    imports: [
        TypeOrmModule.forRoot(TYPEORM_CONFIG),
        UsersModule,
        EventsModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
