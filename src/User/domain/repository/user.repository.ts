import { Optional } from "src/core/ortogonal_solutions/Optional";
import { User } from "../User";
import { MementoUser } from "../mementoUser";
import { Either } from "src/core/ortogonal_solutions/Either";

export interface UserRepository{
    findUserLogin(email:string,pass:string):Promise<Either<Optional<MementoUser>, Error>>;
    getUserByEmail(email:string):Promise<Either<Optional<MementoUser>, Error>>;
    createUser(email:string, name:string,pass:string,bornDate:string,):Promise<Either<Optional<MementoUser>, Error>>;
}


