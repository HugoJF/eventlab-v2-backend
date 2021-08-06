import request from 'supertest';
import {Test} from '@nestjs/testing';
import {ExecutionContext, INestApplication} from '@nestjs/common';
import {AppModule} from "../app.module";
import {getConnection} from "typeorm";
import {subDays} from 'date-fns'
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

describe('EventsController', () => {
    let app: INestApplication;

    const eventBody = {
        title: 'My title',
        description: 'My description',
        starts_at: subDays(new Date, 5).toISOString(),
        ends_at: subDays(new Date, 2).toISOString()
    }

    const eventUpdate = {
        description: 'New description',
    }

    const eventFinal = {...eventBody, ...eventUpdate};

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
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
        await getConnection().synchronize(true); // wipe database
        await app.init();
    });

    it(`/GET health`, () => {
        request(app.getHttpServer())
            .get('/health')
            .expect(200)
            .expect('We healthy');
    });

    it('/POST events', () => {
        request(app.getHttpServer())
            .post('/events')
            .send(eventBody)
            .expect(201);
    });

    it('/GET events', () => {
        request(app.getHttpServer())
            .get('/events')
            .expect(200)
            .expect(value => {
                if (value.body.length !== 1) throw new Error('Could not find event stored in database');
            })
    });

    it('/PATCH event', () => {
        request(app.getHttpServer())
            .patch('/events/1')
            .send(eventUpdate)
            .expect(200, eventFinal);
    });

    it('/DELETE event', () => {
        request(app.getHttpServer())
            .delete('/events/1')
            .expect(200)
    });

    afterAll(async () => {
        await app.close();
    });
});