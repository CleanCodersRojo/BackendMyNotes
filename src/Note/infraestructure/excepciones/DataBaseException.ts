
import { AbstractException } from "../../../Shared/domain/Shared_App_Exceptions/AbstractException";
import { TipoError } from "../../../Shared/domain/Shared_App_Exceptions/TipoErrorAplicacion";

export class DataBaseException extends AbstractException{

    constructor(error:any){
        let message = "DataBase error = " + error;
        super(TipoError.DataBaseError,message);
    }
}