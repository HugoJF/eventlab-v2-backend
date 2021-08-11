import request from 'supertest';
import {Test} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import {getConnection} from "typeorm";
import {AppModule} from "../src/app.module";

describe('AuthController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test
            .createTestingModule({
                imports: [AppModule],
            })
            .compile();

        app = moduleRef.createNestApplication();

        // Wipe database
        await getConnection().dropDatabase();
        await getConnection().runMigrations();

        // Init application
        await app.init();
    });

    it('POST /register - register', async () => {
        await request(app.getHttpServer())
            .post('/auth/register')
            .send({ // TODO: generate data using factory
                name: 'User name',
                email: 'asd@asd.com',
                password: '123123123',
                password_confirmation: '123123123',
            })
            .expect(201)
    });

    it('POST /login - login registered user', async () => {
        await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                username: 'asd@asd.com',
                password: '123123123',
            })
            .expect(201)
    });

    afterAll(async () =>
        await app.close()
    );
});