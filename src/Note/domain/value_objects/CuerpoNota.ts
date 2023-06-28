import { IValueObject } from "src/Shared/domain/IValueObject";

export class CuerpoNota implements IValueObject{
    private cuerpo:string;

    constructor(s:string){
        this.cuerpo = s;
    }

    public equals(other: CuerpoNota): boolean{
        if (other.getCuerpo() == this.getCuerpo())
            return true;
        else
            return false;
    }

    public getCuerpo():string {
        return this.cuerpo;
    }



}