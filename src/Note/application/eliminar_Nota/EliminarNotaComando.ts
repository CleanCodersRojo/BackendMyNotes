import { Optional } from "src/core/ortogonal_solutions/Optional";
import { TipoComando } from "../../../core/application/core_Comandos/TipoComandoNotas";
import { ICommand } from "../../../core/application/core_Comandos/ICommand";

export class EliminarNotaComando extends ICommand{
    id:string;
    fechaEliminacion:Date;
    usuarioId:string;

    constructor(id:string, fe:Date, user:string){
        super();
        super.tipoComando = TipoComando.EliminarNota;
        this.id = id;
        this.fechaEliminacion = fe;
        this.usuarioId = user;
    }
}