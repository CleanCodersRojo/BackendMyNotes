import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";



export class ActualizarCreateDTO{
  
    @IsString()
    nombre:string;
   
    
}