import { Optional } from "src/Shared/utilities/Optional";
import { IdNota } from "../value_objects/IdNota";
import { TituloNota } from "../value_objects/TituloNota";
import { CuerpoNota } from "../value_objects/CuerpoNota";
import { FechaNota } from "../value_objects/FechaNota";
import { UbicacionNota } from '../value_objects/UbicacionNota';
import { IdUser } from "src/User/domain/value_objects/IdUser";
import { ParteCuerpoSnapshot } from "./ParteCuerpoSnapshot";
import { IdNotaExcepcion } from "../excepciones/IdNotaExcepcion";
import { TituloNotaExcepcion } from "../excepciones/TituloNotaExcepcion";
import { FechaCreacionNotaExcepcion } from "../excepciones/FechaCreacionNotaExcepcion";
import { FechaActualizacionNotaExcepcion } from "../excepciones/FechaActualizacionNotaExcepcion";
import { IdUserExcepcion } from "../excepciones/IdUserException";

export class NotaSnapshot{
    notaId:string;
    titulo:string;
    cuerpo:Array<ParteCuerpoSnapshot>;
    fechaCreacion:Date;
    fechaEliminacion:Optional<Date>;
    fechaActualizacion:Date;
    latitud:Optional<number>;
    altitud:Optional<number>;
    usuarioId:string;

    constructor(id:string, titulo:string, cuerpo:Array<ParteCuerpoSnapshot>, fechaCreacion:Date, fechaEliminacion:Optional<Date>, 
        fechaActualizacion:Date, latitud:Optional<number>, altitud:Optional<number>, usuarioId:string){
        /*Verificar que algun valor sea nulo*/
        const userAux:Optional<string> = new Optional<string>(usuarioId);
        if (!userAux.HasValue())
            throw new IdUserExcepcion();
        const idAux:Optional<string> = new Optional<string>(id); 
        if (!idAux.HasValue())
            throw new IdNotaExcepcion();
        const tituloAux:Optional<string> = new Optional<string>(titulo);
        if (!tituloAux.HasValue())
            throw new TituloNotaExcepcion();
        const creacionAux:Optional<Date> = new Optional<Date>(fechaCreacion);
        if (!creacionAux.HasValue())
            throw new FechaCreacionNotaExcepcion();
        const actualizacionAux:Optional<Date> = new Optional<Date>(fechaActualizacion);
        if (!actualizacionAux.HasValue())
            throw new FechaActualizacionNotaExcepcion();
        
            
        //==================================//
        this.notaId = id;
        this.titulo = titulo;
        this.cuerpo = cuerpo;
        this.fechaCreacion = fechaCreacion;
        this.fechaEliminacion = fechaEliminacion;
        this.fechaActualizacion = fechaActualizacion;
        this.latitud = latitud;
        this.altitud = altitud;
        this.usuarioId = usuarioId;
    }

    static newSnapshot(id:IdNota, titulo:TituloNota, cuerpo:CuerpoNota, fechaCreacion:FechaNota, fechaEliminacion:Optional<FechaNota>, 
        fechaActualizacion:FechaNota, ubicacion:Optional<UbicacionNota>, usuarioId:IdUser):NotaSnapshot{
        let fe:Optional<Date>;
        if (fechaEliminacion.HasValue()){
            fe = new Optional<Date>(fechaEliminacion.getValue().getFecha());
        }
        else{
            fe =new Optional<Date>();
        }

        let la:Optional<number>;
        let al:Optional<number>;
        if (ubicacion.HasValue()){
            la = new Optional<number>(ubicacion.getValue().getLatitud());
            al = new Optional<number>(ubicacion.getValue().getAltitud());
        }
        else{
            la = new Optional<number>();
            al = new Optional<number>();
        }

        return new NotaSnapshot(id.getId(),titulo.getTitulo(),cuerpo.getCuerpo(), fechaCreacion.getFecha(), fe, 
                                fechaActualizacion.getFecha(), la, al, usuarioId.getId());
    }
}