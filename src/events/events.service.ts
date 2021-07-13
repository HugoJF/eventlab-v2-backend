import {Body, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Event} from "./event.entity";
import {CreateEventDto} from "./dto/create-event-dto";
import {UpdateEventDto} from "./dto/update-event-dto";

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private events: Repository<Event>,
    ) {
    }

    findAll(): Promise<Event[]> {
        return this.events.find({relations: ['user']});
    }

    findOne(id: string): Promise<Event> {
        return this.events.findOne(id, {relations: ['user', 'participants']});
    }

    async remove(id: string): Promise<void> {
        await this.events.delete(id);
    }

    async create(data: CreateEventDto) {
        return await this.events.save({
            ...data,
            starts_at: '2021-05-13 19:22:01',
            ends_at: '2021-05-13 19:22:01',
            created_at: '2021-05-13 19:22:01',
        })
    }

    async update(id: string, body: UpdateEventDto) {
        await this.events.update(id, body);

        return await this.findOne(id);
    }
}
