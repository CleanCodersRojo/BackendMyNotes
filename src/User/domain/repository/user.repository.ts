import { Optional } from "src/Shared/utilities/Optional";
import { User } from "../User";

export interface UserRepository{
    findUserLogin(email:string,pass:string):Promise<Optional<User>>;

}


