import { Controller } from '@nestjs/common';
import { MementoUser } from 'src/User/domain/mementoUser';
import { CommandHandler } from 'src/Shared/application/Shared_Commands/CommandHandler';

@Controller('user')
export class UserController {

    commandHandler:CommandHandler<MementoUser> = new CommandHandler();

}
