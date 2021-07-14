import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {ClassSerializerInterceptor, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: '*',
        }
    });

    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector))
    );

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
    }));

    await app.listen(3000);
}

bootstrap();
