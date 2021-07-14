import {ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindManyOptions, FindOneOptions, Repository} from 'typeorm';
import {Event} from "./event.entity";
import {CreateEventDto} from "./dto/create-event-dto";
import {UpdateEventDto} from "./dto/update-event-dto";
import {User} from "../user/user.entity";

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
    ) {
    }

    findAll(options?: FindManyOptions): Promise<Event[]> {
        return this.eventsRepository.find(options);
    }

    findOne(id: string, options?: FindOneOptions): Promise<Event> {
        return this.eventsRepository.findOne(id, options);
    }

    async remove(id: string): Promise<void> {
        await this.eventsRepository.delete(id);
    }

    async create(user: User, data: CreateEventDto) {
        const now = new Date;
        if (data.starts_at < now) {
            throw new ConflictException();
        }
        if (data.ends_at < now) {
            throw new ConflictException();
        }
        if (data.starts_at > data.ends_at) {
            throw new ConflictException()
        }

        return await this.eventsRepository.save(this.eventsRepository.create({
            ...data, user
        }))
    }

    async update(id: string, body: UpdateEventDto) {
        await this.eventsRepository.update(id, body);

        return await this.findOne(id);
    }
}
