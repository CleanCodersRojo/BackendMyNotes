import { IValueObject } from "src/Shared/domain/IValueObject";
import { TipoParteCuerpo } from "./TipoParteCuerpo";
import { ParteCuerpoSnapshot } from "../../Snapshot/ParteCuerpoSnapshot";

export abstract class ParteCuerpo implements IValueObject{

    protected tipo:TipoParteCuerpo;

    protected constructor(tipo:TipoParteCuerpo){
        this.tipo = tipo;
    }

    abstract equals(other: ParteCuerpo): boolean;
    abstract getParteSnapshot(): ParteCuerpoSnapshot ;
}