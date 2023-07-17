import { TipoComando } from "../../../Shared/application/Shared_Enums/TipoComandoNotas";
import { ICommand } from "../../../Shared/application/Shared_Commands/ICommand";

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