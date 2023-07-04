import { IsArray, IsDateString, IsNumber, IsOptional, IsString, Validate, ValidateNested } from "class-validator";
import { ParteCuerpoSnapshot } from "src/Note/domain/Snapshot/ParteCuerpoSnapshot";
import { ReceptorParteCuerpo } from "src/Note/domain/fabrics/Shared_ParteCuerpo/ReceptorParteCuerpo";
import { TipoParteCuerpo } from "src/Note/domain/value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ParteCuerpoDTO } from "./ParteCuerpoDTO";
import { BodyPartType } from "../Personalized_Validations/CuerpoValidation";
import { Type } from "class-transformer";


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