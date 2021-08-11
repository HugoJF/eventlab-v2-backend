import Faker from 'faker'
import {define} from "typeorm-seeding";
import {User} from "./user.entity";

define(User, (faker: typeof Faker) => {
    const user = new User;

    user.email = faker.internet.email();
    user.password = '123123132'; // TODO: needs bcrypt
    user.name = faker.name.firstName() + ' ' + faker.name.lastName();

    return user;
})