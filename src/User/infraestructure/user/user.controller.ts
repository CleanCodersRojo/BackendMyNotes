import { Body, Controller, Get } from '@nestjs/common';
import { MementoUser } from 'src/User/domain/mementoUser';
import { CommandHandler } from 'src/core/application/core_Comandos/CommandHandler';
import { UserByEmailDTO } from './DTO/userByEmailDTO';
import { UserEmail } from 'src/User/domain/value_objects/UserEmail';

@Controller('user')
export class UserController {

    commandHandler:CommandHandler<MementoUser> = new CommandHandler();

    @Get()
    async UserByEmail(@Body() UserEmail:UserByEmailDTO){

        
    }

}
