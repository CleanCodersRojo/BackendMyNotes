import { IsArray, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { ParteCuerpoSnapshot } from "src/Note/domain/Snapshot/ParteCuerpoSnapshot";
import { TipoParteCuerpo } from "src/Note/domain/value_objects/Cuerpo_VO/TipoParteCuerpo";


export class ModificarNotaDTO{
    @IsString()
    id:string;
    @IsDateString()
    fechaActualizacion:Date;
    @IsString() @IsOptional()
    titulo:string;
    @IsArray() @IsOptional()
    cuerpo:Array<ParteCuerpoSnapshot>;
    @IsDateString() @IsOptional()
    fechaEliminacion:Date;
    @IsNumber() @IsOptional()
    latitud:number;
    @IsNumber() @IsOptional()
    altitud:number;
    @IsString()
    usuarioId:string;
}