import {Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post} from '@nestjs/common';
import {Event} from "./event.entity";
import {EventsService} from "./events.service";
import {CreateEventDto} from "./dto/create-event-dto";
import {UpdateEventDto} from "./dto/update-event-dto";

@Controller('events')
export class EventsController {
    constructor(
        private readonly events: EventsService
    ) {
    }

    @Get()
    async index(): Promise<Event[]> {
        return await this.events.findAll();
    }

    @Post()
    async store(@Body() data: CreateEventDto) {
        return await this.events.create(data);
    }

    @Get(':id')
    async show(@Param('id') id: string) {
        const event = await this.events.findOne(id);

        if (!event) {
            throw new NotFoundException;
        }

        return event;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() body: UpdateEventDto) {
        const event = await this.events.findOne(id);

        if (!event) {
            throw new NotFoundException;
        }
        
        return await this.events.update(id, body);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        await this.events.remove(id);
    }
}
