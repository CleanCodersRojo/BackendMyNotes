import { Optional } from "src/core/ortogonal_solutions/Optional";
import { IdUser } from "src/User/domain/value_objects/IdUser";
import { UserName } from "../value_objects/UserName";
import { UserEmail } from "../value_objects/UserEmail";
import { UserBornDate } from "../value_objects/UserBornDate";
import { UserPass } from "../value_objects/passUser";
import { User } from "../User";

export class FabricaUser {
    static fabricar(id:string, name:string, email:string, bornDate:Date,pass:string ):User{

        const i:IdUser = new IdUser(id);
        const n:UserName= new UserName(name);
        const e:UserEmail = new UserEmail(email);
        const p:UserPass = new UserPass(pass);
        const fc:UserBornDate = new UserBornDate(bornDate);
    
        return new User(i,n,e,fc,p);
    }
}