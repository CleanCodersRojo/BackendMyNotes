import { IGeneradorUUID } from "src/Shared/application/Shared_Commands/IGeneradorUUID";
import {v4} from 'uuid'

export class GeneradorUUID implements IGeneradorUUID{
    public generate(): string {
        let id:string = v4();
        return id;
    }

}