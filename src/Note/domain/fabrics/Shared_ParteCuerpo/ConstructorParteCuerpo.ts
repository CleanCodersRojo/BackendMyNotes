import { ParteCuerpoSnapshot } from "../../Snapshot/ParteCuerpoSnapshot";
import { ParteCuerpo } from "../../value_objects/Cuerpo_VO/ParteCuerpo";
import { ReceptorParteCuerpo } from "./ReceptorParteCuerpo";

export interface ConstructorParteCuerpo{

    fabricar(parte:ReceptorParteCuerpo):ParteCuerpo;
    restaurar(parte:ParteCuerpoSnapshot):ParteCuerpo;
    
}