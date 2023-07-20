import { Optional } from "src/Shared/utilities/Optional";
import { User } from "../User";
import { MementoUser } from "../SnapShot/mementoUser";
import { Either } from "src/Shared/utilities/Either";

export interface UserRepository{
    findUserLogin(email:string,pass:string):Promise<Either<Optional<MementoUser>, Error>>;
    getUserByEmail(email:string):Promise<Either<Optional<MementoUser>, Error>>;
    createUser(user:User):Promise<Either<User, Error>>;
}


