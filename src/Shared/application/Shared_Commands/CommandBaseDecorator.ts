import { Either } from "src/Shared/utilities/Either";
import { ICommand } from "./ICommand";
import { IServicio } from "./IServicio";

export class CommandBaseDecorator<TView> implements IServicio<TView>{
    protected wrapee:IServicio<TView>

    constructor(service:IServicio<TView>){
        this.wrapee = service;
    }

    async execute(cmd:ICommand):Promise<Either<TView, Error>>{
        return await this.wrapee.execute(cmd);
    }
}