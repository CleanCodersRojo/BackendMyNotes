import { Optional } from "src/Shared/utilities/Optional";
import { TipoComando } from "../../../Shared/application/Shared_Commands/TipoComandoNotas";
import { ICommand } from "../../../Shared/application/Shared_Commands/ICommand";
import { TipoParteCuerpo } from "src/Note/domain/value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ParteCuerpoSnapshot } from "src/Note/domain/Snapshot/ParteCuerpoSnapshot";
import { ReceptorParteCuerpo } from "src/Note/domain/fabrics/Shared_ParteCuerpo/ReceptorParteCuerpo";

export class CrearNotaComando extends ICommand{
    titulo:string;
    cuerpo:Array<ReceptorParteCuerpo>;
    fechaCreacion:Date;
    fechaEliminacion:Optional<Date>;
    fechaActualizacion:Date;
    latitud:Optional<number>;
    altitud:Optional<number>;
    usuarioId:string;

    constructor(t:string, c:Array<ReceptorParteCuerpo>, fc:Date, fe:Optional<Date>, fa:Date, l:Optional<number>, a:Optional<number>, user:string){
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