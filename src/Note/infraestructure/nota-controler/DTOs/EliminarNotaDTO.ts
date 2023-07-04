import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";


export class EliminarNotaDTO{
    @IsString()
    id:string;
    @IsDateString()
    fechaEliminacion:Date;
    @IsString()
    usuarioId:string;
}