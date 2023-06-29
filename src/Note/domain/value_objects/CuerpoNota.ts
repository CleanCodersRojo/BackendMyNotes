import { IValueObject } from "src/Shared/domain/IValueObject";
import { ParteCuerpo } from "./Cuerpo_VO/ParteCuerpo";
import { TipoParteCuerpo } from "./Cuerpo_VO/TipoParteCuerpo";

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

    public getCuerpo():Array<{tipo:TipoParteCuerpo}> {
        let list:Array<{tipo:TipoParteCuerpo}> = new Array<{tipo:TipoParteCuerpo}>();
        for (const parte of this.cuerpo) {
            list.push(parte.getParte());
        }
        return list;
    }
}