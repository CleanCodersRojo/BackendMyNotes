import { Optional } from "src/core/ortogonal_solutions/Optional";
import { IdNota } from "./value_objects/IdNota";
import { TituloNota } from "./value_objects/TituloNota";
import { CuerpoNota } from "./value_objects/CuerpoNota";
import { FechaNota } from "./value_objects/FechaNota";
import { UbicacionNota } from './value_objects/UbicacionNota';
import { IdUser } from "src/User/domain/value_objects/IdUser";

export class MementoNota{
    notaId:string;
    titulo:string;
    cuerpo:string;
    fechaCreacion:Date;
    fechaEliminacion?:Date;
    fechaActualizacion:Date;
    latitud?:number;
    altitud?:number;
    usuarioId:string;

    constructor(id:IdNota, titulo:TituloNota, cuerpo:CuerpoNota, fechaCreacion:FechaNota, fechaEliminacion:Optional<FechaNota>, 
        fechaActualizacion:FechaNota, ubicacion:Optional<UbicacionNota>, usuarioId:IdUser){
        this.notaId = id.getId();
        this.titulo = titulo.getTitulo();
        this.cuerpo = cuerpo.getCuerpo();
        this.fechaCreacion = fechaCreacion.getFecha();
        if (fechaEliminacion.HasValue())
            this.fechaEliminacion = fechaEliminacion.getValue().getFecha();
        this.fechaActualizacion = fechaActualizacion.getFecha();
        if (ubicacion.HasValue()){
            this.latitud = ubicacion.getValue().getLatitud();
            this.altitud = ubicacion.getValue().getAltitud();
        }
        
        this.usuarioId = usuarioId.getId();
    }
}