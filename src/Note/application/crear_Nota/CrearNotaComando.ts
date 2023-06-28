import { Optional } from "src/Shared/utilities/Optional";
import { TipoComando } from "../../../Shared/application/Shared_Commands/TipoComandoNotas";
import { ICommand } from "../../../Shared/application/Shared_Commands/ICommand";

export class CrearNotaComando extends ICommand{
    titulo:string;
    cuerpo:string;
    fechaCreacion:Date;
    fechaEliminacion:Optional<Date>;
    fechaActualizacion:Date;
    latitud:Optional<number>;
    altitud:Optional<number>;
    usuarioId:string;

    constructor(t:string, c:string, fc:Date, fe:Optional<Date>, fa:Date, l:Optional<number>, a:Optional<number>, user:string){
        super();
        super.tipoComando = TipoComando.CrearNota;
        this.titulo = t;
        this.cuerpo = c;
        this.fechaCreacion = fc;
        this.fechaEliminacion = fe;
        this.fechaActualizacion = fa;
        this.latitud = l;
        this.altitud = a;
        this.usuarioId = user;
    }
}