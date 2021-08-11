import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
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

    async findOneOrNotFound(id: string, options?: FindOneOptions): Promise<Event> {
        const event = await this.findOne(id, options);

        if (!event) {
            throw new NotFoundException;
        }

        return event;
    }

    async remove(id: string): Promise<void> {
        // deal with non cascading tables
        const event = await this.eventsRepository.findOne(id);
        event.participants = [];
        await this.eventsRepository.save(event);
        await this.eventsRepository.delete(id);
    }

    async create(user: User, data: CreateEventDto) {
        const now = new Date;

        if (data.starts_at < now) {
            throw new BadRequestException([{
                property: 'starts_at',
                constraints: {startsAtMustBeFuture: 'starts_at must be a future date'}
            }]);
        }
        if (data.ends_at < now) {
            throw new BadRequestException([{
                property: 'ends_at',
                constraints: {startsAtMustBeFuture: 'ends_at must be a future date'}
            }]);
        }
        if (data.starts_at > data.ends_at) {
            throw new BadRequestException([{
                property: 'ends_at',
                constraints: {startsAtMustBeFuture: 'ends_at must be after starts_at'}
            }]);
        }

        return await this.eventsRepository.save(this.eventsRepository.create({
            ...data, user
        }))
    }

    async update(id: string, data: UpdateEventDto) {
        const now = new Date;

        if (data.starts_at < now) {
            throw new BadRequestException([{
                property: 'starts_at',
                constraints: {startsAtMustBeFuture: 'starts_at must be a future date'}
            }]);
        }
        if (data.ends_at < now) {
            throw new BadRequestException([{
                property: 'ends_at',
                constraints: {startsAtMustBeFuture: 'ends_at must be a future date'}
            }]);
        }
        if (data.starts_at > data.ends_at) {
            throw new BadRequestException([{
                property: 'ends_at',
                constraints: {startsAtMustBeFuture: 'ends_at must be after starts_at'}
            }]);
        }

        await this.eventsRepository.update(id, data);

        return await this.findOne(id);
    }
}
