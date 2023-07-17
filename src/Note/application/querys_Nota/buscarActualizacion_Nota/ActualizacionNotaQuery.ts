import { TipoQuery } from "src/Shared/application/Shared_Enums/TipoQueryNotas";
import { IQuery } from "src/Shared/application/Shared_Querys/IQuery";

export class ActualizacionNotaQuery extends IQuery{
    fecha:Date;
    usuarioId:string;

    constructor(user:string, fecha:Date){
        super();
        super.tipoQuery = TipoQuery.fechaActualizacion;
        this.fecha = fecha;
        this.usuarioId = user;
    }
}