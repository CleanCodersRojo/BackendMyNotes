import { AbstractException } from "src/Shared/application/Shared_App_Exceptions/AbstractException";
import { TipoErrorAplicacion } from "src/Shared/application/Shared_App_Exceptions/TipoErrorAplicacion";

export class DataBaseException extends AbstractException{

    constructor(error:any){
        let message = "DataBase error = " + error;
        super(TipoErrorAplicacion.DataBaseError,message);
    }
}