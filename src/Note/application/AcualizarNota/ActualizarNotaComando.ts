import { Optional } from "src/core/ortogonal_solutions/Optional";
import { TipoComando } from "../../../core/application/core_Comandos/TipoComandoNotas";
import { ICommand } from "../../../core/application/core_Comandos/ICommand";

export class ActualizarNotaComando extends ICommand{
    notaId:string;
    titulo:string;
    cuerpo:string;
    fechaEliminacion:Optional<Date>;
    fechaActualizacion:Date;

    constructor(id:string,t:string, c:string,  fe:Optional<Date>, fa:Date){
        super();
        super.tipoComando = TipoComando.ActualizarNota;
        this.notaId = id;
        this.titulo = t;
        this.cuerpo = c;
        this.fechaEliminacion = fe;
        this.fechaActualizacion = fa;
       
    }
}