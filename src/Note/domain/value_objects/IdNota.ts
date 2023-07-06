import { IValueObject } from "src/Shared/domain/IValueObject";

export class IdNota implements IValueObject{
    private uuid:string = "";

    constructor(id:string){
        //En la clase core utilizar una interfaz que por inyeccion de dependencia utilice la libreria por defecto de uuids
        //si es que se puede
        this.uuid = id;
    }

    public equals(other: IdNota): boolean{
        if (other.getId() == this.getId())
            return true;
        else
            return false;
    }

    public getId():string{
        return this.uuid;
    }

}