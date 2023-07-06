/* import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/User/domain/User";
import { FabricaUser } from "src/User/domain/fabrics/fabricaUser";
import { MementoUser } from "src/User/domain/mementoUser";
import { UserRepository } from "src/User/domain/repository/user.repository";
import { Either } from "src/core/ortogonal_solutions/Either";
import { Optional } from "src/core/ortogonal_solutions/Optional";
import { userModel } from "../../schemas/userModel";

export class MongoUserRepository implements UserRepository{
    constructor(@InjectModel(User.name) private readonly usermodel:userModel){}

   async createUser(email: string, name: string, pass: string, bornDate: string): Promise<Either<Optional<MementoUser>, Error>> {
        throw new Error("Method not implemented.");
    }
    
    async findUserLogin(email: string, pass: string): Promise<Either<Optional<MementoUser>, Error>>{
        try{
            const data = await this.usermodel.find({email:email,pass:pass})

            for (const userjson of data){
                let  user:User = FabricaUser.fabricar(userjson.userId, userjson.name,userjson.email,userjson.bornDate,userjson.pass);
                const vistaUser:MementoUser = user.guardar();
            }
           
            return Promise.resolve(Either.makeLeft<Optional<MementoUser>,Error>(new Optional<MementoUser>(vistaUser)));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<MementoUser>, Error>(e))
        }
    }

    async getUserByEmail(email: string): Promise<Either<Optional<MementoUser>, Error>> {
        const data = await this.usermodel.find({email:email})
        try {
        
        for (const userjson of data){
            let user:User = FabricaUser.fabricar(userjson.userId, userjson.name,userjson.email,userjson.bornDate,userjson.pass);
            const vistaUser:MementoUser = user.guardar();
        }
        return Promise.resolve(Either.makeLeft<Optional<MementoUser>,Error>(new Optional<MementoUser>(vistaUser)));
    } catch (e) {
        return Promise.resolve(Either.makeRight<Optional<MementoUser>, Error>(e))
    }
    }

    
} */