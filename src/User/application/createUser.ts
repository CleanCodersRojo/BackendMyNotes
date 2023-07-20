import { UserRepository } from "../domain/repository/user.repository"

export class CreateUser{
    constructor(private UserRepository: UserRepository){}

/* public createUser =async ({email:string,name:string,pass:string,bornDate:Date})=>{
  //  const product= new ProductValue(name)
    const user = this.UserRepository.getUserByEmail(email)
    //return user
} */

}