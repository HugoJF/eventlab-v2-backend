import {Controller} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Controller()
export class UsersController {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>
    ) {
    }
}
