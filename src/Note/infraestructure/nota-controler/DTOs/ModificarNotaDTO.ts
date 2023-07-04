import { IsArray, IsDateString, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { ParteCuerpoSnapshot } from "src/Note/domain/Snapshot/ParteCuerpoSnapshot";
import { ReceptorParteCuerpo } from "src/Note/domain/fabrics/Shared_ParteCuerpo/ReceptorParteCuerpo";
import { TipoParteCuerpo } from "src/Note/domain/value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ParteCuerpoDTO } from "./ParteCuerpoDTO";


export class ModificarNotaDTO{
    @IsString()
    id:string;
    @IsDateString()
    fechaActualizacion:Date;
    @IsString() @IsOptional()
    titulo:string;
    @IsArray() @IsOptional() @ValidateNested()
    cuerpo:Array<ParteCuerpoDTO>;
    @IsDateString() @IsOptional()
    fechaEliminacion:Date;
    @IsNumber() @IsOptional()
    latitud:number;
    @IsNumber() @IsOptional()
    altitud:number;
    @IsString()
    usuarioId:string;
}