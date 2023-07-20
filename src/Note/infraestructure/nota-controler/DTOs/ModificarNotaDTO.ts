import { IsArray, IsDateString, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
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