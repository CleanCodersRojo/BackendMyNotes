import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";



export class UserByEmailDTO{
    @IsString()
    email:string;
    
}