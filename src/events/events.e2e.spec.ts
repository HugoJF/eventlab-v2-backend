import request from 'supertest';
import {Test} from '@nestjs/testing';
import {ExecutionContext, INestApplication} from '@nestjs/common';
import {AppModule} from "../app.module";
import {getConnection} from "typeorm";
import {subDays} from 'date-fns'
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

describe('EventsController', () => {
    let app: INestApplication;

    const eventBase = {
        title: 'My title',
        description: 'My description',
        user_id: 1,
        starts_at: subDays(new Date, 5).toISOString(),
        ends_at: subDays(new Date, 2).toISOString(),
        created_at: (new Date).toISOString(),
        updated_at: (new Date).toISOString(),
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

        // Init application
        await app.init();
    });

    it('GET /health - returns expected string', () =>
        request(app.getHttpServer())
            .get('/health')
            .expect(200)
            .expect('We healthy')
    );

    it('POST events - returns HTTP 201', () =>
        request(app.getHttpServer())
            .post('/events')
            .send(eventBase)
            .expect(201)
    );

    it('GET /events - returns the created event', () =>
        request(app.getHttpServer())
            .get('/events')
            .expect(200)
            .expect(value => {
                if (value.body.length !== 1) throw new Error('Could not find event stored in database');
            })
    );

    it('PATCH /event - updates created event', () =>
        request(app.getHttpServer())
            .patch('/events/1')
            .send(eventChanges)
            .expect(200, eventUpdated)
    );

    it('DELETE /event - deletes created event', () =>
        request(app.getHttpServer())
            .delete('/events/1')
            .expect(200)
    );

    afterAll(async () =>
        await app.close()
    );
});