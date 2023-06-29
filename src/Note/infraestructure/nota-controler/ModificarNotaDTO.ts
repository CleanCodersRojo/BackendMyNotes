import { IsArray, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { TipoParteCuerpo } from "src/Note/domain/value_objects/Cuerpo_VO/TipoParteCuerpo";


export class ModificarNotaDTO{
    @IsString()
    id:string;
    @IsDateString()
    fechaActualizacion:Date;
    @IsString() @IsOptional()
    titulo:string;
    @IsArray() @IsOptional()
    cuerpo:Array<{tipo:TipoParteCuerpo}>;
    @IsDateString() @IsOptional()
    fechaEliminacion:Date;
    @IsNumber() @IsOptional()
    latitud:number;
    @IsNumber() @IsOptional()
    altitud:number;
    @IsString()
    usuarioId:string;
}