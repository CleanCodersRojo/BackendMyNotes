import { ParteCuerpoSnapshot } from "../Snapshot/ParteCuerpoSnapshot";
import { ParteCuerpo } from "../value_objects/Cuerpo_VO/ParteCuerpo";
import { TipoParteCuerpo } from "../value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ConstructorParteCuerpo } from "./ConstructorParteCuerpo";

export class FabricaCuerpo {
    private constructores:Map<TipoParteCuerpo, ConstructorParteCuerpo>;

    constructor(){
        this.constructores = new Map();
    }

    public addConstructor(t:TipoParteCuerpo, c:ConstructorParteCuerpo){
        this.constructores.set(t,c);
    }

    public fabricar(parte:ParteCuerpoSnapshot):ParteCuerpo{
        for (let key of this.constructores.keys()) {
            if (ParteCuerpoSnapshot.transformarATipo(parte.tipo) == key){
                return this.constructores.get(key).fabricar(parte);
            }
        }
    }
}