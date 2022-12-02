import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { runInThisContext } from 'vm';
import { CreateEventDto, CreateEventNewsDto } from './dto/create-event.dto';
import { UpdateEventDto,UpdateEventNewDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {

  eventTypes = [
    'COURSE',
    'WORKSHOP',
    'ANNOUNCEMENT'
]
eventsTypes = [
  'COURSE',
  'WORKSHOP',
  'ANNOUNCEMENT',
  'NEWS'
]


  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model <Event>
  ){}




  async createNew(createEvenNewstDto: CreateEventNewsDto) {

    try{

        console.log(createEvenNewstDto);
        createEvenNewstDto.type = createEvenNewstDto.type.toUpperCase()

      
        const newEvent = await this.eventModel.create(createEvenNewstDto)
        return newEvent

      } catch(error){

        throw new BadRequestException("No se pudo guardar")

      }
  }

  async create(createEventDto: CreateEventDto) {

    console.log(createEventDto);
    
    createEventDto.type = createEventDto.type.toUpperCase()


    if(!this.eventTypes.includes(createEventDto.type.toUpperCase())){

          throw new BadRequestException(`No existe el tipo de evento '${createEventDto.type}'`)

    }

    try{

        const newEvent = await this.eventModel.create(createEventDto)
        return {
          status:true,
          newEvent
        }

      } catch(error){

        throw new BadRequestException("No se pudo guardar")

      }


  }


  async findAll(event:string, query: any) {

    if (!this.eventsTypes.includes(event.toUpperCase())) {
        throw new BadRequestException(`No existe el evento '${event}`)
    }


      try {
    
        const events = await this.eventModel.find({
          type: event.toUpperCase(),
          isActive: true,
        })
          .select(["-isActive", "-type"])
          .skip((query - 1) * 20)
          .limit(20);
    

        const Body ={
          events,
          totalEvents: events.length
        }

        console.log(Body);
        

        return Body

        
      } catch (error) {
        throw new BadRequestException(`Error Server`)
      }
  


      
    
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} event`;
  // }

 async updateNew(id: string, updateEventNewDto: UpdateEventNewDto) {
    


  console.log(id);
  

      const event = await this.eventModel.findByIdAndUpdate(id,updateEventNewDto);
      console.log(updateEventNewDto);
      console.log(event);
      

      if (!event) {
        
        throw new BadRequestException('no existe el evento')

      }
  
  
      return {
        status: true,
        msg: "Actualizado correctamente"
      }





  }

 async update(id: string, updateEventDto: UpdateEventDto) {
    

    const event = await this.eventModel.findByIdAndUpdate(id,updateEventDto);
    console.log(updateEventDto);
    console.log(event);
    

    if (!event) {
      
      throw new BadRequestException('no existe el evento')

    }


    return {
      status: true,
      msg: 'Actualizado correctamente'
    }


  }

async  remove(id: string) {



    try {
      const event = await this.eventModel.findById(id);
  
      if (!event) {
        throw new BadRequestException(`No existe el evento con el id ${id}`)
      }
  
      event.isActive = false;
      await event.save();
  
      return {
        status: true,
        msg: `evento ${event.title} desactivado`
      }
      
    } catch (error) {
      throw new BadRequestException(`Error`)
    }






  }
}
