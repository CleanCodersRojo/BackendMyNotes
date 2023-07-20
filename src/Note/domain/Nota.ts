import { Optional } from "../../Shared/utilities/Optional";
import {IdNota} from "../../Note/domain/value_objects/IdNota";
import {CuerpoNota} from "../../Note/domain/value_objects/CuerpoNota";
import {TituloNota} from "../../Note/domain/value_objects/TituloNota";
import {FechaNota} from "../../Note/domain/value_objects/FechaNota";
import { IdUser } from "../../User/domain/value_objects/IdUser";
import { UbicacionNota } from './value_objects/UbicacionNota';
import { NotaSnapshot } from "./Snapshot/NotaSnapshot";
import { EliminacionYaExisteExcepcion } from "./excepciones/EliminacionYaExisteExcepcion";
import { UbicacionYaExisteExcepcion } from "./excepciones/UbicacionYaExisteExcepcion";

export class Nota {
    private notaId:IdNota;
    private titulo:TituloNota;
    public cuerpo:CuerpoNota;
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

    public setTitulo(t: TituloNota):void{
        this.titulo = t;
        //tirar evento de cuerpo actualizado
    }

    public setCuerpo(c: CuerpoNota):void{
        this.cuerpo = c;
        //tirar evento de cuerpo actualizado
    }

    public setActualizacion(fecha:FechaNota):void{
        this.fechaActualizacion = fecha;
    }

    public localizar(ubi:UbicacionNota):void{
        if (!this.ubicacion.HasValue()){
            this.ubicacion = new Optional<UbicacionNota>(ubi);
        }
        else{//No se le puede cambiar la ubicaicon a una nota con ubicacion
            throw new UbicacionYaExisteExcepcion();
        }
    }

    public deslocalizar():void{
        this.ubicacion = new Optional<UbicacionNota>();
    }
    
    public eliminar(fecha:FechaNota){
        if (!this.fechaEliminacion.HasValue())
            this.fechaEliminacion = new Optional<FechaNota>(fecha);
        else{ //No se le puede dar una fecha de eliminacion a una nota ya eliminada
            throw new EliminacionYaExisteExcepcion();
        } 
    }

    public restaurar():void{
        this.fechaEliminacion = new Optional<FechaNota>();
    }

    public getSnapshot():NotaSnapshot{
        return NotaSnapshot.newSnapshot(this.notaId, this.titulo, this.cuerpo,this.fechaCreacion, this.fechaEliminacion , this.fechaActualizacion,
                                this.ubicacion, this.usuario);
    }
}