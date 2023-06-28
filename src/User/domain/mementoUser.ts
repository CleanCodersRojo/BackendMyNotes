import { Optional } from "src/Shared/utilities/Optional";

import { IdUser } from "src/User/domain/value_objects/IdUser";
import { UserName } from "./value_objects/UserName";
import { UserEmail } from "./value_objects/UserEmail";
import { UserBornDate } from "./value_objects/UserBornDate";

export class MementoUser{
    userId:string;
    name:string;
    email:string;
    pass:string;
    bornDate:Date;
   

    constructor(id:IdUser, name:UserName, email:UserEmail, bornDate:UserBornDate){
        this.userId = id.getId();
        this.name = name.getTitulo();
        this.email = email.getTitulo();
        this.bornDate = bornDate.getFecha();
    }
}