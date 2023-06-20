import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";


export class ActualizarNotaDTO{
    @IsString()
    notaId:string;
    @IsString()
    titulo:string;
    @IsString()
    cuerpo:string;
    @IsDateString() @IsOptional()
    fechaEliminacion:Date;
    @IsDateString()
    fechaActualizacion:Date;
}