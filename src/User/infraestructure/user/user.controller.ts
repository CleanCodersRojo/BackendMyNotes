import { Body, Controller, Get } from '@nestjs/common';
import { MementoUser } from 'src/User/domain/SnapShot/mementoUser';
import { CommandHandler } from 'src/Shared/application/Shared_Commands/CommandHandler';
import { UserByEmailDTO } from './DTO/userByEmailDTO';
import { UserRepository } from 'src/User/domain/repository/user.repository';
import { UsertByEmail } from 'src/User/application/userByEmailFinder';

import { MongoUserRepository } from './repository/mongo-user-repository';
import { Post } from '@nestjs/common';
import { CreateUser } from 'src/User/application/createUser';
import { UserCreateDTO } from './DTO/userCreateDTO';
import { UserLoginDTO } from './DTO/userLoginDTO';
import { UserLogin } from 'src/User/application/userLogin';

import { userModel,userSchema } from "../../infraestructure/schemas/userModel";

@Controller('user')
export class UserController {

    commandHandler:CommandHandler<MementoUser> = new CommandHandler();
    
    constructor(private repoUser: UserRepository){
        
    }

    @Get()
    async UserByEmail(@Body() userEmail:UserByEmailDTO){
        const userApp=new UsertByEmail(this.repoUser)
        return userApp.findUserEmail(userEmail.email)

    }
    @Post()
    async CreateUser(@Body() UserCreateDTO:UserCreateDTO){
        const userApp=new CreateUser(this.repoUser)
       // return userApp.createUser(UserCreateDTO.email,UserCreateDTO.name,UserCreateDTO.pass,UserCreateDTO.bornDate)
        
    }

    @Get()
    async UserLogin(@Body() userLogin:UserLoginDTO){
        const userApp=new UserLogin(this.repoUser)
       return userApp.findUserLogin(userLogin.email,userLogin.pass)
    }
    

}
