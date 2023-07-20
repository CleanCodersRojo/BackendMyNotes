import { TipoParteCuerpo } from "src/Note/domain/value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ValidacionParteCuerpo } from "./ValidacionParteCuerpo";
import { ValidacionImagen } from "./ValidacionImagen";
import { ValidacionTexto } from "./ValidacionTexto";
import { ParteCuerpoDTO } from "../DTOs/ParteCuerpoDTO";

export class ValidacionCuerpo {
    private constructores:Map<TipoParteCuerpo, ValidacionParteCuerpo>;

    constructor(){
        this.constructores = new Map();
        this.constructores.set(TipoParteCuerpo.Imagen,new ValidacionImagen());
        this.constructores.set(TipoParteCuerpo.textoPlano,new ValidacionTexto());
    }

    /*public addConstructor(t:TipoParteCuerpo, c:ConstructorParteCuerpo){
        this.constructores.set(t,c);
    }*/

    public esValido(parte:ParteCuerpoDTO):boolean{
        for (let key of this.constructores.keys()) {
            if (parte.tipo == key.valueOf()){
                return this.constructores.get(key).esValido(parte);
            }
        }
    }
}