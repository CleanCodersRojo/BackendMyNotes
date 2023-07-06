import { IValueObject } from "src/Shared/domain/IValueObject";

export class NombreEtiqueta implements IValueObject{
    private uuid:string = "";

    constructor(id:string){
        this.uuid = id;
    }

    public equals(other: NombreEtiqueta): boolean{
        if (other.getnombre() == this.getnombre())
            return true;
        else
            return false;
    }

    public getnombre():string{
        return this.uuid;
    }

}