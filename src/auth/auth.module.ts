import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([
      {
      name: User.name,
      schema: UserSchema
      }
    ]),
    JwtModule.register({
      secret: 'AaronSecretSeed',
      signOptions: { expiresIn: '5h' },
    })
  ]
})
export class AuthModule {}
