
import { EtiquetaSnapshot } from "./Snapshots/EtiquetaSnapShot";
import { IdEtiqueta } from "./value_objects/idEtiqueta";
import { NombreEtiqueta } from "./value_objects/nombreEtriqueta";

export class Etiqueta {
    
    private id:IdEtiqueta;
    private nombre: NombreEtiqueta;
 
    constructor(id:IdEtiqueta, nombre:NombreEtiqueta){
        this.id = id;
        this.nombre =nombre
    }
    public guardar():EtiquetaSnapshot{
        return  EtiquetaSnapshot.newSnapshot(this.id, this.nombre);
    }
}