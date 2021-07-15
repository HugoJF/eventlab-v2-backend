import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from "../../user/user.entity";
import {Event} from "../event.entity";

@Injectable()
export class PresenceService {
    constructor(
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
    ) {
    }

    async join(event: Event, user: User) {
        event.participants = [user, ...event.participants];

        await this.eventsRepository.save(event);
    }

    async leave(event: Event, user: User) {
        event.participants = event.participants.filter(participant => participant.id !== user.id);

        await this.eventsRepository.save(event);
    }
}
