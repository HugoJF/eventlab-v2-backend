import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {UsersModule} from "./user/users.module";
import {EventsModule} from "./events/events.module";
import {AuthModule} from './auth/auth.module';
import {Event} from "./events/event.entity";
import {User} from "./user/user.entity";
import {CreateUsersTable1628606392441} from "./migrations/1628606392441-CreateUsersTable";
import {CreateEventsTable1628607058600} from "./migrations/1628607058600-CreateEventsTable";
import {CreateEventUserTable1628609799749} from "./migrations/1628609799749-CreateEventUserTable";

const TYPEORM_CONFIG: TypeOrmModuleOptions = {
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: +process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "secret",
    database: process.env.DB_DATABASE || "eventlab",
    entities: [Event, User],
    migrations: [
        CreateUsersTable1628606392441,
        CreateEventsTable1628607058600,
        CreateEventUserTable1628609799749
    ],
    migrationsRun: true,
    synchronize: false, // TODO: use migrations
    logging: ['migration']
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
