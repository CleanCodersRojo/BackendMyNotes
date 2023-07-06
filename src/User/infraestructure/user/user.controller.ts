import { Body, Controller, Get } from '@nestjs/common';
import { MementoUser } from 'src/User/domain/SnapShot/mementoUser';
import { CommandHandler } from 'src/Shared/application/Shared_Commands/CommandHandler';
import { UserByEmailDTO } from './DTO/userByEmailDTO';

@Controller('user')
export class UserController {

    commandHandler:CommandHandler<MementoUser> = new CommandHandler();

    @Get()
    async UserByEmail(@Body() UserEmail:UserByEmailDTO){

        
    }

}
