import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";



export class EtiquetaCreateDTO{
  
    @IsString()
    nombre:string;
   
    
}