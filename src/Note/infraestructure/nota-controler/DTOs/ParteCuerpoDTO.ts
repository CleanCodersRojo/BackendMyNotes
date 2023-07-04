import { IsNumber, IsString, Validate } from "class-validator";
import { BodyPartType } from "../Personalized_Validations/CuerpoValidation";

export class ParteCuerpoDTO{
    @IsString() //@Validate(BodyPartType)
    tipo:string;  
}


export class TextoCuerpoDTO extends ParteCuerpoDTO{
    @IsString() //@Validate(BodyPartType)
    texto:string;
    size:number;  
}

export class ImagenCuerpoDTO extends ParteCuerpoDTO{
    @IsString() //@Validate(BodyPartType)
    bytes:string;
}
