import {Controller, Get, Param, ParseIntPipe, Res} from '@nestjs/common';
import {AppService} from './app.service';
import {Repository} from "typeorm";
import {User} from "./user/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Response} from "express";
import {Event} from "./events/event.entity";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(Event) private readonly events: Repository<Event>,
    ) {
    }

    @Get()
    async getHello(): Promise<string> {
        return JSON.stringify(await this.users.find());
    }

    @Get('generate')
    async generate(): Promise<User> {
        const user = this.users.create({
            name: 'Generated guy',
            email: 'asd@asd.com',
            api_token: 'TOK',
        });

        return this.users.save(user);
    }
}
