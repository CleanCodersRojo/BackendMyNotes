import { IsArray, IsString} from "class-validator";

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
