import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { hash, compare } from 'bcrypt'
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model <User>,
    private jwtService: JwtService
  ){}

  async create(createAuthDto: CreateAuthDto) {

      createAuthDto.fullName = createAuthDto.fullName.toLowerCase()
      createAuthDto.password = await hash(createAuthDto.password, 10)
    
      try {

        const newUser = await this.userModel.create(createAuthDto) 
        return  newUser
        
      } catch (error) {

        if(error.code == 11000) throw new BadRequestException(`Ya exite un usuario llamado ${createAuthDto.username}`)
        else {
          console.log(error);

          throw new InternalServerErrorException('AVISAME DEME')
          
        }

      
        
      }

  }


  async login(loginAuthDto: LoginAuthDto){

      const {username, password} = loginAuthDto
      const findUser = await this.userModel.findOne({username})

      console.log(findUser);
    

      if(!findUser) throw new HttpException('Usuario/Contraseña Incorrectos', 403)

      const checkPassword =  await compare( password, findUser.password);

      if(!checkPassword) throw new HttpException("Usuario/Contraseña incorrectas", 403)

      const payload = {
        id: findUser._id,
        role: findUser.role
      }
      const token = await this.jwtService.sign(payload)


      const data= {

        user: {
          username: findUser.username,
          fullname: findUser.fullName,
          role:     findUser.role
        }, 
        token

      }

      return data

  }

 
}
