import { IValueObject } from "src/Shared/domain/IValueObject";

export class UserName implements IValueObject{
    private name:string = "";

    constructor(s:string){
        this.name = s;
    }

    public equals(other: UserName): boolean{
        if (other.getTitulo() == this.getTitulo())
            return true;
        else
            return false;
    }

    public getTitulo():string{
        return this.name;
    }
}