import { TipoQuery } from "src/Shared/application/Shared_Enums/TipoQueryNotas";
import { IQuery } from "src/Shared/application/Shared_Querys/IQuery";

export class CreacionNotaQuery extends IQuery{
    fecha:Date;
    usuarioId:string;

    constructor(user:string, fecha:Date){
        super();
        super.tipoQuery = TipoQuery.fechaCreacion;
        this.fecha = fecha;
        this.usuarioId = user;
    }
}