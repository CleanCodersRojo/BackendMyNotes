import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";


export class ModificarNotaDTO{
    @IsString()
    id:string;
    @IsDateString()
    fechaActualizacion:Date;
    @IsString() @IsOptional()
    titulo:string;
    @IsString() @IsOptional()
    cuerpo:string;
    @IsDateString() @IsOptional()
    fechaEliminacion:Date;
    @IsNumber() @IsOptional()
    latitud:number;
    @IsNumber() @IsOptional()
    altitud:number;
    @IsString()
    usuarioId:string;
}