import { IValueObject } from "src/Shared/domain/IValueObject";

export class UserPass implements IValueObject{
    private email:string = "";

    constructor(s:string){
        this.email = s;
    }

    public equals(other: UserPass): boolean{
        if (other.getPass() == this.getPass())
            return true;
        else
            return false;
    }

    public getPass():string{
        return this.email;
    }
}