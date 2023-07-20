import { IsArray, IsNumber, IsString, Validate } from "class-validator";
import { isUint8Array } from "util/types";

export class ParteCuerpoDTO{
    @IsString()
    tipo:string;  
}


export class TextoCuerpoDTO extends ParteCuerpoDTO{
    @IsString()
    texto:string;
    size:number;  
}

export class ImagenCuerpoDTO extends ParteCuerpoDTO{
    @IsArray() //@Validate(BodyPartType)
    url:string;
}
