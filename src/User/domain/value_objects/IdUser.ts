import { IValueObject } from "src/Shared/domain/IValueObject";

export class IdUser implements IValueObject{
    private uuid:string = "";

    constructor(id:string){
        this.uuid = id;
    }

    public equals(other: IdUser): boolean{
        if (other.getId() == this.getId())
            return true;
        else
            return false;
    }

    public getId():string{
        return this.uuid;
    }

}