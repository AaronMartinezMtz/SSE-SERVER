import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, CreateEventNewsDto } from './dto/create-event.dto';
import { UpdateEventDto, UpdateEventNewDto } from './dto/update-event.dto';
import { query } from 'express';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  
  @Post('create/NEWS')
  createNew(@Body() createEventNewsDto: CreateEventNewsDto) {
    
        return this.eventService.createNew(createEventNewsDto);
  }

  @Post('create/:id')
  create(@Body() createEventDto: CreateEventDto,@Param('id') id: string) {
        console.log(createEventDto);
        return this.eventService.create(createEventDto);
  }


  @Get('getAllByEvent/:event')
  findAll(@Param('event') event: string, @Query() query: any ) {
    console.log(query);
    
    return this.eventService.findAll(event,query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.eventService.findOne(+id);
  // }


  @Patch('updateNew/:id')
  updateNew(@Param('id') id: string, @Body() updateEventnewDto: UpdateEventNewDto) {
    return this.eventService.updateNew(id, updateEventnewDto);
  }


  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }



  @Delete('desactivate/:id')
  remove(@Param('id') id: string) {

    return this.eventService.remove(id);
  }
}
