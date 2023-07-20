import { IsArray, IsDateString, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { ParteCuerpoDTO } from "./ParteCuerpoDTO";


export class CrearNotaDTO{
    @IsString()
    titulo:string;
    @IsArray() 
    @ValidateNested({each: true})
    //@Type(() => ParteCuerpoDTO)
    cuerpo:Array<ParteCuerpoDTO>;
    @IsDateString()
    fechaCreacion:Date;
    @IsDateString() @IsOptional()
    fechaEliminacion:Date;
    @IsDateString()
    fechaActualizacion:Date;
    @IsNumber() @IsOptional()
    latitud:number;
    @IsNumber() @IsOptional()
    altitud:number;
    @IsString()
    usuarioId:string;
}