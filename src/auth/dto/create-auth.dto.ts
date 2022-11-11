import { IsString } from "class-validator"

export class CreateAuthDto {

    @IsString()
    username:   string

    @IsString()
    fullName:       string

    @IsString()
    password:   string

    @IsString()
    role:       string

}
