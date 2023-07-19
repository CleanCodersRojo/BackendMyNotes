 import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/User/domain/User";
import { FabricaUser } from "src/User/domain/fabrics/fabricaUser";

import { UserRepository } from "src/User/domain/repository/user.repository";

import { userModel } from "../../schemas/userModel";
import { Optional } from "src/Shared/utilities/Optional";
import { Either } from "src/Shared/utilities/Either";
import { MementoUser } from "src/User/domain/SnapShot/mementoUser";
export class MongoUserRepository implements UserRepository{

    constructor(@InjectModel(User.name) private readonly usermodel:userModel){}
    
    createUser(user: User): Promise<Either<User, Error>> {
        throw new Error("Method not implemented.");
    }
/* 
   async createUser(user:User): Promise<Either<User, Error>> {
       const mementoUser:MementoUser= user.guardar( userModel)

       try {
        const userSaved= await (new this.usermodel(mementoUser)).save();
        return Either.makeLeft<User, Error>(user);
    } catch (e) {
        return Either.makeRight<User, Error>(e);
    }
    } */
    
    async findUserLogin(email: string, pass: string): Promise<Either<Optional<MementoUser>, Error>>{
        try{
            const data = await this.usermodel.find({email:email,pass:pass})
            let vistaUser:MementoUser 
            for (const userjson of data){
                let  user:User = FabricaUser.fabricar(userjson.userId, userjson.name,userjson.email,userjson.bornDate,userjson.pass);
                const vista:MementoUser = user.guardar();
                vistaUser= vista
            }
           
            return Promise.resolve(Either.makeLeft<Optional<MementoUser>,Error>(new Optional<MementoUser>(vistaUser)));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<MementoUser>, Error>(e))
        }
    }

    async getUserByEmail(email: string): Promise<Either<Optional<MementoUser>, Error>> {
        const data = await this.usermodel.find({email:email})
        try {
            let vistaUser:MementoUser 
        for (const userjson of data){
            let user:User = FabricaUser.fabricar(userjson.userId, userjson.name,userjson.email,userjson.bornDate,userjson.pass);
            const vista:MementoUser = user.guardar();
        }
        return Promise.resolve(Either.makeLeft<Optional<MementoUser>,Error>(new Optional<MementoUser>(vistaUser)));
    } catch (e) {
        return Promise.resolve(Either.makeRight<Optional<MementoUser>, Error>(e))
    }
    }

    
} 