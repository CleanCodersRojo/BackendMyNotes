import { ValidacionParteCuerpo } from "./ValidacionParteCuerpo";
import { Optional } from "src/Shared/utilities/Optional";
import { TextoCuerpoDTO } from "../DTOs/ParteCuerpoDTO";
import { isString } from "class-validator";

export class ValidacionTexto implements ValidacionParteCuerpo{
    public esValido(parte:TextoCuerpoDTO):boolean{
        //evaluar que los atributos son válidos
        const texto:Optional<string> = new Optional<string>(parte.texto);
        
        if (texto.HasValue()){
            return isString(texto.getValue());
        }
        else{
            return false;
        }        
    }

}