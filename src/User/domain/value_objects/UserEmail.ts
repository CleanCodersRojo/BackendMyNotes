import { IValueObject } from "src/Shared/domain/IValueObject";

export class UserEmail implements IValueObject{
    private email:string = "";

    constructor(s:string){
        this.email = s;
    }

    public equals(other: UserEmail): boolean{
        if (other.getTitulo() == this.getTitulo())
            return true;
        else
            return false;
    }

    public getTitulo():string{
        return this.email;
    }
}