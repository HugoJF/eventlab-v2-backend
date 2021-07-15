import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import {EventsService} from "./events.service";
import {CreateEventDto} from "./dto/create-event-dto";
import {UpdateEventDto} from "./dto/update-event-dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UsersService} from "../user/users.service";

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventsController {
    constructor(
        private readonly events: EventsService,
        private readonly users: UsersService,
    ) {
    }

    @Get()
    async index() {
        return await this.events.findAll({relations: ['user', 'participants']});
    }

    @Post()
    async store(@Request() request, data: CreateEventDto) {
        const user = await this.users.findOne(request.user.sub, {relations: ['user', 'participants']});

        return await this.events.create(user, data);
    }

    @Get(':id')
    async show(@Param('id') id: string) {
        return await this.events.findOneOrNotFound(id, {relations: ['user', 'participants']});
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() body: UpdateEventDto) {
        // TODO: is this even needed?
        const event = await this.events.findOneOrNotFound(id);

        return await this.events.update(id, body);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        await this.events.remove(id);
    }
}
