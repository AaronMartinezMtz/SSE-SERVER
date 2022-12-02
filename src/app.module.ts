import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [

    MongooseModule.forRoot('mongodb+srv://Aaron:merjyv-8zuqsu-kenroH@cluster2.11l8lk1.mongodb.net/?retryWrites=true&w=majority'),

    AuthModule,

    UsersModule,

    EventModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
