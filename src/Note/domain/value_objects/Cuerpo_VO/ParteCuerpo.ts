import { IValueObject } from "src/Shared/domain/IValueObject";
import { TipoParteCuerpo } from "./TipoParteCuerpo";

export abstract class ParteCuerpo implements IValueObject{

    protected tipo:TipoParteCuerpo;

    protected constructor(tipo:TipoParteCuerpo){
        this.tipo = tipo;
    }

    abstract equals(other: ParteCuerpo): boolean;
    abstract getParte(): {tipo:TipoParteCuerpo} ;
}