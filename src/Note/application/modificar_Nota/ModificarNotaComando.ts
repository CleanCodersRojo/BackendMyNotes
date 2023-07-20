import { Optional } from "src/Shared/utilities/Optional";
import { TipoComando } from "../../../Shared/application/Shared_Enums/TipoComandoNotas";
import { ICommand } from "../../../Shared/application/Shared_Commands/ICommand";
import { TipoParteCuerpo } from "src/Note/domain/value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ParteCuerpoSnapshot } from "src/Note/domain/Snapshot/ParteCuerpoSnapshot";
import { ReceptorParteCuerpo } from "src/Note/domain/fabrics/Shared_ParteCuerpo/ReceptorParteCuerpo";

export class ModificarNotaComando extends ICommand{
    id:string;
    fechaActualizacion:Date;
    titulo:Optional<string>;
    cuerpo:Optional<Array<ReceptorParteCuerpo>>;
    fechaEliminacion:Optional<Date>;
    latitud:Optional<number>;
    altitud:Optional<number>;
    usuarioId:string;

    constructor(id:string, fa:Date, t:Optional<string>, c:Optional<Array<ReceptorParteCuerpo>>, fe:Optional<Date>, l:Optional<number>, a:Optional<number>, 
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