import {Event} from "./src/events/event.entity";
import {User} from "./src/user/user.entity";
import {CreateUsersTable1628606392441} from "./src/migrations/1628606392441-CreateUsersTable";
import {CreateEventsTable1628607058600} from "./src/migrations/1628607058600-CreateEventsTable";
import {CreateEventUserTable1628609799749} from "./src/migrations/1628609799749-CreateEventUserTable";
import {TypeOrmModuleOptions} from "@nestjs/typeorm";

const config: TypeOrmModuleOptions = {
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
    synchronize: false,
    logging: ['migration']
}
export default config;
