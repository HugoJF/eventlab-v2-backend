import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsersModule} from "./user/users.module";
import {EventsModule} from "./events/events.module";

@Module({
  imports: [
      TypeOrmModule.forRoot(),
      UsersModule,
      EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
