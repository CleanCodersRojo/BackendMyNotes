import { Optional } from "src/Shared/utilities/Optional";
import { TipoComando } from "../../../Shared/application/Shared_Commands/TipoComandoNotas";
import { ICommand } from "../../../Shared/application/Shared_Commands/ICommand";

export class ModificarNotaComando extends ICommand{
    id:string;
    fechaActualizacion:Date;
    titulo:Optional<string>;
    cuerpo:Optional<string>;
    fechaEliminacion:Optional<Date>;
    latitud:Optional<number>;
    altitud:Optional<number>;
    usuarioId:string;

    constructor(id:string, fa:Date, t:Optional<string>, c:Optional<string>, fe:Optional<Date>, l:Optional<number>, a:Optional<number>, 
        user:string){
        super();
        super.tipoComando = TipoComando.ModificarNota;
        this.id = id;
        this.titulo = t;
        this.cuerpo = c;
        this.fechaEliminacion = fe;
        this.fechaActualizacion = fa;
        this.latitud = l;
        this.altitud = a;
        this.usuarioId = user;
    }
}