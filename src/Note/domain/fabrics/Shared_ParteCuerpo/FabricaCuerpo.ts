import { ParteCuerpoSnapshot } from "../../Snapshot/ParteCuerpoSnapshot";
import { ParteCuerpo } from "../../value_objects/Cuerpo_VO/ParteCuerpo";
import { TipoParteCuerpo } from "../../value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ConstructorImagenCuerpo } from "../FabricaImagen/ConstructorImagenCuerpo";
import { ConstructorTextoPlanoCuerpo } from "../FabricaTexto/ConstructorTextoPlanoCuerpo";
import { ConstructorParteCuerpo } from "./ConstructorParteCuerpo";
import { ReceptorParteCuerpo } from "./ReceptorParteCuerpo";

export class FabricaCuerpo {
    private constructores:Map<TipoParteCuerpo, ConstructorParteCuerpo>;

    constructor(){
        this.constructores = new Map();
        this.constructores.set(TipoParteCuerpo.Imagen,new ConstructorImagenCuerpo());
        this.constructores.set(TipoParteCuerpo.textoPlano,new ConstructorTextoPlanoCuerpo());
    }

    public fabricar(parte:ReceptorParteCuerpo):ParteCuerpo{
        for (let key of this.constructores.keys()) {
            if (parte.tipo == key.valueOf()){
                return this.constructores.get(key).fabricar(parte);
            }
        }
    }

    public restaurar(parte:ParteCuerpoSnapshot):ParteCuerpo{
        for (let key of this.constructores.keys()) {
            if (parte.getTipo() == key){
                return this.constructores.get(key).restaurar(parte);
            }
        }
    }
}