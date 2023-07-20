import { IValueObject } from "src/Shared/domain/IValueObject";

export class NombreEtiqueta implements IValueObject{
    private nombre:string = "";

    constructor(nombre:string){
        this.nombre = nombre;
    }

    public equals(other: NombreEtiqueta): boolean{
        if (other.getnombre() == this.getnombre())
            return true;
        else
            return false;
    }

    public getnombre():string{
        return this.nombre;
    }

}