import { Optional } from "src/Shared/utilities/Optional";
import { IdEtiqueta } from "../value_objects/idEtiqueta";
import { NombreEtiqueta } from "../value_objects/nombreEtriqueta";

export class EtiquetaSnapshot{
    idEtiqueta:string;
    nombre:string;
    

    constructor(id:string, nombre:string){
        this.idEtiqueta = id;
        this.nombre = nombre;
    }

    static newSnapshot(id:IdEtiqueta, nombre:NombreEtiqueta):EtiquetaSnapshot{
        return new EtiquetaSnapshot(id.getId(),nombre.getnombre());
    }
}