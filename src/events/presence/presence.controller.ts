import {Controller, Delete, Param, Post, Request, UseGuards} from '@nestjs/common';
import {EventsService} from "../events.service";
import {UsersService} from "../../user/users.service";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";
import {PresenceService} from "./presence.service";

@Controller('events/:id/presence')
@UseGuards(JwtAuthGuard)
export class PresenceController {
    constructor(
        private usersService: UsersService,
        private eventsService: EventsService,
        private presenceService: PresenceService,
    ) {
    }

    @Post()
    async join(@Request() req, @Param('id') id: string) {
        const user = await this.usersService.findOne(req.user.sub);
        const event = await this.eventsService.findOneOrNotFound(id, {relations: ['participants']});

        await this.presenceService.join(event, user);

        return await this.eventsService.findOne(id, {relations: ['participants']});
    }

    @Delete()
    async leave(@Request() req, @Param('id') id: string) {
        const user = await this.usersService.findOne(req.user.sub);
        const event = await this.eventsService.findOneOrNotFound(id, {relations: ['participants']});

        await this.presenceService.leave(event, user);

        return await this.eventsService.findOne(id, {relations: ['participants']});
    }
}
