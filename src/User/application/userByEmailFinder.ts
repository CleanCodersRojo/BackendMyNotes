import { UserRepository } from "../domain/repository/user.repository"

export class UsertUsecase{
    constructor(private UserRepository: UserRepository){}

public findUserEmail =async (email: string)=>{
  //  const product= new ProductValue(name)
    const user = this.UserRepository.getUserByEmail(email)
    return user
}

}