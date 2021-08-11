import request from 'supertest';
import {Test} from '@nestjs/testing';
import {ExecutionContext, INestApplication} from '@nestjs/common';
import {AppModule} from "../app.module";
import {getConnection} from "typeorm";
import {subDays} from 'date-fns'
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {factory, useSeeding} from "typeorm-seeding";
import {User} from "../user/user.entity";
// Instead of using typeorm-seeding method of loading factories, directly import factories.
// This allows the ormconfig.ts to be correctly typed (because there's no need to specify "factories" anymore)
import '../user/user.factory';

describe('EventsController', () => {
    let app: INestApplication;

    const startsAt = subDays(new Date, 5);
    startsAt.setMilliseconds(0);

    const endsAt = subDays(new Date, 2);
    endsAt.setMilliseconds(0);

    const eventBase = {
        title: 'My title',
        description: 'My description',
        starts_at: startsAt.toISOString(),
        ends_at: endsAt.toISOString(),
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
        await useSeeding({
            connection: 'default',
        });

        // Create user that is "authenticated"
        const user = await factory(User)().create();

        // Init application
        await app.init();
    });

    it('GET /health - returns expected string', async () => {
        await request(app.getHttpServer())
            .get('/health')
            .expect(200)
            .expect('We healthy')
    });

    it('POST events - returns HTTP 201', async () => {
        await request(app.getHttpServer())
            .post('/events')
            .send(eventBase)
            .expect(201)
    });

    it('GET /events - returns the created event', async () => {
        await request(app.getHttpServer())
            .get('/events')
            .expect(200)
            .expect(value => {
                if (value.body.length !== 1) throw new Error('Could not find event stored in database');
            })
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