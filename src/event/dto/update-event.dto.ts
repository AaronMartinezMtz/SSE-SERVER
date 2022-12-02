import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDateString, IsString, MinLength, ValidateNested } from 'class-validator';

export class infoGeneral{
    
    @MinLength(2)
    @IsString()
    category:       string

    @MinLength(2)
    @IsString()
    instructor:     string


    @IsDateString()
    initial_date:   string

    @IsDateString()
    final_date:     string

    @MinLength(2)
    @IsString()
    location:       string        

    @MinLength(2)
    @IsString()
    modality:       string
    
    @MinLength(2)
    @IsString()
    link:           string

}


export class infoNews{

    @MinLength(2)
    @IsString()
    category:       string
    
    @MinLength(2)
    @IsString()
    link:           string

}




export class UpdateEventDto {

    @MinLength(2)
    @IsString()
    type:           string

    @MinLength(2)
    @IsString()
    title:          string

    @MinLength(2)
    @IsString()
    description:    string

    @MinLength(2)
    @IsString()
    body:           string

    @MinLength(2)
    @IsString()
    image:          string

    @Type(() => infoGeneral)
    @ValidateNested()
    info: infoGeneral

}

export class UpdateEventNewDto {

    @MinLength(2)
    @IsString()
    type:           string
    
    @MinLength(2)
    @IsString()
    title:          string

    @MinLength(2)
    @IsString()
    description:    string

    @MinLength(2)
    @IsString()
    body:           string

    @MinLength(1)
    @IsString()
    image:          string


    @Type(() => infoNews)
    @ValidateNested()
     info: infoNews

}
