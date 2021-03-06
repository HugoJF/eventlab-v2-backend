import request from 'supertest';
import {Test} from '@nestjs/testing';
import {ExecutionContext, INestApplication} from '@nestjs/common';
import {AppModule} from "../src/app.module";
import {getConnection} from "typeorm";
import {subDays} from 'date-fns'
import {JwtAuthGuard} from "../src/auth/jwt-auth.guard";
import {factory, useSeeding} from "typeorm-seeding";
import {User} from "../src/user/user.entity";
// Instead of using typeorm-seeding method of loading factories, directly import factories.
// This allows the ormconfig.ts to be correctly typed (because there's no need to specify "factories" anymore)
import '../src/user/user.factory';

describe('EventsController', () => {
    let app: INestApplication;

    const startsAt = subDays(new Date, 5);
    startsAt.setMilliseconds(0); // MySQL does not store milliseconds for timestamps

    const endsAt = subDays(new Date, 2);
    endsAt.setMilliseconds(0); // MySQL does not store milliseconds for timestamps

    const eventBase = {
        title: 'My title',
        description: 'My description',
        starts_at: startsAt.toISOString(),
        ends_at: endsAt.toISOString(),
    }
    const eventFlippedDates = {
        title: 'I have invalid data',
        description: 'And will throw an error (hopefully)',
        starts_at: endsAt.toISOString(),
        ends_at: startsAt.toISOString(),
    }
    const eventChanges = {
        description: 'New description',
    }
    const eventUpdated = {...eventBase, ...eventChanges};

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
        await useSeeding();

        // Create user that is "authenticated"
        await factory(User)().create();

        // Init application
        await app.init();
    });

    it('GET /health - returns expected string', async () => {
        await request(app.getHttpServer())
            .get('/health')
            .expect(200)
            .expect('We healthy')
    });

    it('POST /events - returns HTTP 201', async () => {
        await request(app.getHttpServer())
            .post('/events')
            .send(eventBase)
            .expect(201)
    });

    it('POST /events - starts_at after ends_at will throw BadRequest', async () => {
        await request(app.getHttpServer())
            .post('/events')
            .send(eventFlippedDates)
            .expect(400)
    });

    it('GET /events - returns the created event', async () => {
        const response = await request(app.getHttpServer())
            .get('/events')
            .expect(200)

        expect(response.body.length).toStrictEqual(1)
    });

    it('PATCH /event - updates created event', async () => {
        const response = await request(app.getHttpServer())
            .patch('/events/1')
            .send(eventChanges)
            .expect(200)

        // FIXME: magic
        expect(response.body).toEqual(
            expect.objectContaining(eventUpdated)
        );
    });

    it('DELETE /event - deletes created event', async () => {
        await request(app.getHttpServer())
            .delete('/events/1')
            .expect(204)
    });

    afterAll(async () =>
        await app.close()
    );
});