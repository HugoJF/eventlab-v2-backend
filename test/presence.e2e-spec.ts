import request from 'supertest';
import {Test} from '@nestjs/testing';
import {ExecutionContext, INestApplication} from '@nestjs/common';
import {AppModule} from "../src/app.module";
import {getConnection} from "typeorm";
import {JwtAuthGuard} from "../src/auth/jwt-auth.guard";
import {factory, useSeeding} from "typeorm-seeding";
import {User} from "../src/user/user.entity";
import {Event} from '../src/events/event.entity';
// Instead of using typeorm-seeding method of loading factories, directly import factories.
// This allows the ormconfig.ts to be correctly typed (because there's no need to specify "factories" anymore)
import '../src/user/user.factory';
import '../src/events/event.factory';

describe('PresenceController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test
            .createTestingModule({
                imports: [AppModule],
            })
            .overrideGuard(JwtAuthGuard)
            .useValue({
                canActivate: (context: ExecutionContext) => {
                    const req = context.switchToHttp().getRequest();
                    req.user = {sub: 1};
                    return true
                },
            })
            .compile();

        app = moduleRef.createNestApplication();

        // Wipe database
        await getConnection().dropDatabase();
        await getConnection().runMigrations();

        // Setup typeorm-seeding
        await useSeeding({
            connection: 'default',
        });

        // Create user that is "authenticated"
        const user = await factory(User)().create();

        // Create event
        const event = await factory(Event)().create({
            user
        });

        // Init application
        await app.init();
    });

    it('POST /events/:id/presence - joins event', async () => {
        // TODO: validate database has presence
        await request(app.getHttpServer())
            .post('/events/1/presence')
            .expect(201)
    });

    it('DELETE /events/:id/presence - deletes event', async () => {
        // TODO: validate database has presence
        await request(app.getHttpServer())
            .delete('/events/1/presence')
            .expect(200)
    });

    afterAll(async () =>
        await app.close()
    );
});