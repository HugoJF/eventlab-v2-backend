import {Controller, Get} from '@nestjs/common';
import {AppService} from '../app.service';
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

    @Get('health')
    async health() {
        return 'We healthy';
    }
}
