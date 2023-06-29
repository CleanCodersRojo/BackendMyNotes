import { IValueObject } from "src/Shared/domain/IValueObject";

export class UbicacionNota implements IValueObject{
    private latitud:number;
    private altitud:number;

    constructor(l:number, a:number){
        this.latitud = l;
        this.altitud = a;
    }

    public getLatitud():number{
        return this.latitud;
    }

    public getAltitud():number{
        return this.altitud;
    }

    public equals(other:UbicacionNota):boolean{
        if((other.getAltitud() == this.altitud) && (other.getLatitud() == this.latitud))
            return true;
        else
            return false;
    }
}