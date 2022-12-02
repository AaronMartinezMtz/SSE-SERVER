import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsJSON, IsString, ValidateNested } from "class-validator";
import { Document } from "mongoose";




@Schema()
 class EventInfo{

    @Prop({  isRequired:false   })
    @IsString()
    category:       string


    @Prop({  isRequired:false   })
    @IsString()
    instructor:     string
    

    @Prop({  isRequired:false   })
    @IsDate()
    initial_date:   string


    @Prop({  isRequired:false   })
    @IsDate()
    final_date:     string


    @Prop({  isRequired:false   })
    @IsString()
    location:       string        


    @Prop({  isRequired:false   })
    @IsString()
    modality:       string
    

    @Prop({  isRequired:false   })
    @IsString()
    link:           string

}


@Schema()
export class Event extends Document {

    @IsString()
    @Prop({isRequired: true})
    type:   string

    @IsString()
    @Prop({isRequired: true})
    title: string

    @IsString()
    @Prop({isRequired: true})
    description:    string

    @IsString()
    @Prop({isRequired: true})
    body:           string

    @IsString()
    @Prop({default: "noimage.jpg"})
    image:          string

    @IsBoolean()
    @Prop({isRequired:false ,default: true})
    isActive:       boolean

    @Prop({ type: EventInfo })
    info: EventInfo


}


export const EventSchema = SchemaFactory.createForClass(Event);