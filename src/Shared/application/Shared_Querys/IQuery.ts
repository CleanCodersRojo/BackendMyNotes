import { TipoQuery } from "../Shared_Enums/TipoQueryNotas";

export abstract class IQuery{
    protected tipoQuery:TipoQuery;

    getType():TipoQuery{ return this.tipoQuery}
}