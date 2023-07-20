import { ReceptorTextoCuerpo } from "src/Note/domain/fabrics/FabricaTexto/ReceptorTextoCuerpo";
import { ValidacionParteCuerpo } from "./ValidacionParteCuerpo";
import { Optional } from "src/Shared/utilities/Optional";
import { ReceptorImagenCuerpo } from "src/Note/domain/fabrics/FabricaImagen/ReceptorImagenCuerpo";
import { ImagenCuerpoDTO } from "../DTOs/ParteCuerpoDTO";
import { isUint8Array } from "util/types";
import { isNumber, isString } from "class-validator";

export class ValidacionImagen implements ValidacionParteCuerpo{
    public esValido(parte:ImagenCuerpoDTO):boolean{
        //evaluar que los atributos son válidos
        const url:Optional<string> = new Optional<string>(parte.url);
        
        if (url.HasValue()){
            return isString(url.getValue());
        }
        else{
            return false;
        }  

        /*const bytes:Optional<Uint8Array> = new Optional<Uint8Array>(parte.bytes);
        if (bytes.HasValue()){
            try {
                const imagen:Uint8Array = new Uint8Array(bytes.getValue());
                let valid:boolean = true;
                for(let byte of parte.url){
                    console.log(byte);
                    if (!isNumber(byte)){
                        return false;
                    }
                }
                return true;
            } catch (error) {
                return false;
            }
        }
        else{
            return false;
        }     */   
    }

}