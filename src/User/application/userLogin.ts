import { UserRepository } from "../domain/repository/user.repository"

export class UserLogin{
    constructor(private UserRepository: UserRepository){}

public findUserLogin =async (email: string ,pass :string)=>{
    const user = this.UserRepository.findUserLogin(email,pass)
    return user
}

}