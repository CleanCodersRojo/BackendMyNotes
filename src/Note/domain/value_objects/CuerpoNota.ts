import { IValueObject } from "src/Shared/domain/IValueObject";
import { ParteCuerpo } from "./Cuerpo_VO/ParteCuerpo";
import { ParteCuerpoSnapshot } from "../Snapshot/ParteCuerpoSnapshot";

export class CuerpoNota implements IValueObject{
    private cuerpo:Array<ParteCuerpo> = new Array<ParteCuerpo>();

    constructor(s:Array<ParteCuerpo>){
        this.cuerpo = s;
    }

    public equals(other: CuerpoNota): boolean{
        if (other.getCuerpo() == this.getCuerpo())
            return true;
        else
            return false;
    }

    public getCuerpo():Array<ParteCuerpoSnapshot> {
        let list:Array<ParteCuerpoSnapshot> = new Array<ParteCuerpoSnapshot>();
        for (const parte of this.cuerpo) {
            list.push(parte.getParteSnapshot());
        }
        return list;
    }
}