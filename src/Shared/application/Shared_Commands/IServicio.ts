import { Either } from "src/Shared/utilities/Either";
import { ICommand } from "./ICommand";

export interface IServicio<TView>{
    execute(cmd:ICommand):Promise<Either<TView, Error>>
}