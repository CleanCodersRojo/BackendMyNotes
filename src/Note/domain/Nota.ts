import { Optional } from "src/core/ortogonal_solutions/Optional";
import {IdNota} from "src/Note/domain/value_objects/IdNota";
import {CuerpoNota} from "src/Note/domain/value_objects/CuerpoNota";
import {TituloNota} from "src/Note/domain/value_objects/TituloNota";
import {FechaNota} from "src/Note/domain/value_objects/FechaNota";
import { IdUser } from "src/User/domain/value_objects/IdUser";
import { UbicacionNota } from './value_objects/UbicacionNota';
import { MementoNota } from "./MementoNota";

export class Nota {
    private notaId:IdNota;
    private titulo:TituloNota;
    private cuerpo:CuerpoNota;
    private fechaCreacion:FechaNota;
    private fechaEliminacion:Optional<FechaNota>;
    private fechaActualizacion:FechaNota;
    private ubicacion:Optional<UbicacionNota>;
    private usuario:IdUser;


    constructor(id:IdNota, t:TituloNota, c:CuerpoNota, fechaCreacion:FechaNota, fechaEliminacion:Optional<FechaNota>, 
                fechaActualizacion:FechaNota, ubicacion:Optional<UbicacionNota>, user:IdUser){
        this.notaId = id;
        this.titulo = t;
        this.cuerpo = c;
        this.fechaCreacion = fechaCreacion;
        this.fechaEliminacion = fechaEliminacion;
        this.fechaActualizacion = fechaActualizacion;
        this.ubicacion = ubicacion;
        this.usuario = user;
    }

    public eliminar(fecha:FechaNota){
        this.fechaEliminacion = new Optional<FechaNota>(fecha);
    }

    public setTitulo(t: TituloNota):void{
        this.titulo = t;
        //tirar evento de cuerpo actualizado
    }

    public setCuerpo(c: CuerpoNota):void{
        this.cuerpo = c;
        //tirar evento de cuerpo actualizado
    }

    public guardar():MementoNota{
        return new MementoNota(this.notaId, this.titulo, this.cuerpo,this.fechaCreacion, this.fechaEliminacion , this.fechaActualizacion,
                                this.ubicacion, this.usuario);
    }

}