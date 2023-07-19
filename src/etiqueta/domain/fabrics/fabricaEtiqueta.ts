
import { IdEtiqueta } from "../value_objects/idEtiqueta";
import { NombreEtiqueta } from "../value_objects/nombreEtriqueta";
import { Etiqueta } from "../etiqueta";

export class FabricaEtiqueta {
    static fabricar(id:string, name:string ):Etiqueta{

        const i:IdEtiqueta = new IdEtiqueta(id);
        const n:NombreEtiqueta= new NombreEtiqueta(name);
       
    
        return new Etiqueta(i,n);
    }
}