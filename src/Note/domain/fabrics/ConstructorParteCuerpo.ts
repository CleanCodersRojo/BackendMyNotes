import { ParteCuerpo } from "../value_objects/Cuerpo_VO/ParteCuerpo";
import { TipoParteCuerpo } from "../value_objects/Cuerpo_VO/TipoParteCuerpo";

export interface ConstructorParteCuerpo{

    fabricar(parte:{tipo:TipoParteCuerpo}):ParteCuerpo;
}