import { MementoUser } from "./SnapShot/mementoUser";
import { IdUser } from "./value_objects/IdUser";
import { UserBornDate } from "./value_objects/UserBornDate";
import { UserEmail } from "./value_objects/UserEmail";
import { UserName } from "./value_objects/UserName";
import { UserPass } from "./value_objects/passUser";

export class User {
    private id:IdUser;
    private name: UserName;
    private email: UserEmail;
    private bornDate: UserBornDate;
    private pass : UserPass;

    constructor(id:IdUser, name:UserName, email:UserEmail, bornDate:UserBornDate,pass:UserPass){
        this.id = id;
        this.name =name 
        this.email=email
        this.bornDate=bornDate
        this.pass=pass
    }
    public guardar():MementoUser{
        return new MementoUser(this.id, this.name, this.email, this.bornDate,this.pass);
    }
}