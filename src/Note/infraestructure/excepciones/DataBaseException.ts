
import { AbstractException } from "src/Shared/domain/Shared_App_Exceptions/AbstractException";
import { TipoError } from "src/Shared/domain/Shared_App_Exceptions/TipoErrorAplicacion";

export class DataBaseException extends AbstractException{

    constructor(error:any){
        let message = "DataBase error = " + error;
        super(TipoError.DataBaseError,message);
    }
}