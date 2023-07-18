import { TipoParteCuerpo } from "src/Note/domain/value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ConvertidorTexto } from "./ConvertidorParteCuerpo/ConvertidorTexto";
import { ConvertidorParteCuerpo } from "./ConvertidorParteCuerpo/ConvertidorParteCuerpo";
import { ConvertidorImagen } from "./ConvertidorParteCuerpo/ConvertidorImagen";
import { Document } from "mongodb";
import { ParteCuerpoSnapshot } from "src/Note/domain/Snapshot/ParteCuerpoSnapshot";

export class ConvertidorCuerpo {
    private convertidores:Map<TipoParteCuerpo, ConvertidorParteCuerpo>;

    constructor(){
        this.convertidores = new Map();
        this.convertidores.set(TipoParteCuerpo.Imagen,new ConvertidorImagen());
        this.convertidores.set(TipoParteCuerpo.textoPlano, new ConvertidorTexto());
    }

    public convertir(partemodel:Document):ParteCuerpoSnapshot{
        for (let key of this.convertidores.keys()) {
            if (partemodel.tipo == key.valueOf()){
                
                return this.convertidores.get(key).convertir(partemodel);
            }
        }
    }
}