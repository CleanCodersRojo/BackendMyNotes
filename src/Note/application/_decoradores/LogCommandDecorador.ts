import { CommandBaseDecorator } from "src/Shared/application/Shared_Commands/CommandBaseDecorator";
import { ILogger } from "./ILogger";
import { IServicio } from "src/Shared/application/Shared_Commands/IServicio";
import { ICommand } from "src/Shared/application/Shared_Commands/ICommand";
import { Either } from "src/Shared/utilities/Either";

export class LogCommandDecorador<TView> extends CommandBaseDecorator<TView>{
    private logger:ILogger;

    constructor(service:IServicio<TView>, logger:ILogger){
        super(service);
        this.logger = logger;

    }

    async execute(cmd:ICommand):Promise<Either<TView, Error>>{
        const result:Either<TView, Error> = await super.execute(cmd);
        if (result.isLeft()){
            console.log(result.getLeft());
            const resultstring:string = JSON.stringify(result.getLeft(),null,2);

            this.logger.log("Resultado exitoso de cmd de tipo:" + cmd.getType() + "\nresultado: " + resultstring);
        }
        else{
            const resultstring:string = JSON.stringify(result.getRight(),null,2);
            this.logger.log("Resultado excepcional de cmd de tipo:" + cmd.getType() + "\n error:" + resultstring);
        }
        
        return result;
    }
}