import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Admin } from "mongodb";
import { Document } from "mongoose";



@Schema()
export class User  extends Document{
    
    @IsString()
    @Prop({
        unique: true
    })
    username:       string

    @Prop({
        isRequired: true
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    fullName:           string

    @Prop({
        isRequired: true
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    password:       string

    @Prop({
        default: 'admin'
    })
    role:           string



}


export const UserSchema = SchemaFactory.createForClass(User);