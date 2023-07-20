import { TipoQuery } from "src/Shared/application/Shared_Enums/TipoQueryNotas";
import { IQuery } from "src/Shared/application/Shared_Querys/IQuery";

export class TituloNotaQuery extends IQuery{
    titulo:string;
    usuarioId:string;

    constructor(user:string, titulo:string){
        super();
        super.tipoQuery = TipoQuery.titulo;
        this.titulo = titulo;
        this.usuarioId = user;
    }
}