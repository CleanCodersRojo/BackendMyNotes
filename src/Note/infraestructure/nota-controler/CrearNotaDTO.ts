import { IsArray, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { ParteCuerpoSnapshot } from "src/Note/domain/Snapshot/ParteCuerpoSnapshot";
import { TipoParteCuerpo } from "src/Note/domain/value_objects/Cuerpo_VO/TipoParteCuerpo";


export class CrearNotaDTO{
    @IsString()
    titulo:string;
    @IsArray()
    cuerpo:Array<ParteCuerpoSnapshot>;
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