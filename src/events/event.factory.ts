import Faker from 'faker'
import {define} from "typeorm-seeding";
import {Event} from "./event.entity";

define(Event, (faker: typeof Faker) => {
    const event = new Event;

    event.title = faker.lorem.sentence(10);
    event.description = faker.lorem.text();
    event.starts_at = faker.date.recent(-2);
    event.ends_at = faker.date.recent(-5);

    event.created_at = new Date;
    event.updated_at = new Date;

    return event;
})