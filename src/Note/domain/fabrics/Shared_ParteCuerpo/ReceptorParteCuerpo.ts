import { TipoParteCuerpo } from "../../value_objects/Cuerpo_VO/TipoParteCuerpo";

export class ReceptorParteCuerpo{
    tipo:String;
    
    constructor(tipo:TipoParteCuerpo){
        this.tipo = tipo;
    }
}