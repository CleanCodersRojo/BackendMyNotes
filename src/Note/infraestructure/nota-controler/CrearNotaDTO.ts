import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";


export class CrearNotaDTO{
    @IsString()
    titulo:string;
    @IsString()
    cuerpo:string;
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