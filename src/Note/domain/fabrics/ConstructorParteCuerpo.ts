import { ParteCuerpoSnapshot } from "../Snapshot/ParteCuerpoSnapshot";
import { ParteCuerpo } from "../value_objects/Cuerpo_VO/ParteCuerpo";
import { TipoParteCuerpo } from "../value_objects/Cuerpo_VO/TipoParteCuerpo";

export interface ConstructorParteCuerpo{

    fabricar(parte:ParteCuerpoSnapshot):ParteCuerpo;
    
}