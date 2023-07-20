import { AbstractException } from "../../../Shared/application/Shared_App_Exceptions/AbstractException";
import { TipoErrorAplicacion } from "../../../Shared/application/Shared_App_Exceptions/TipoErrorAplicacion";

export class DataBaseException extends AbstractException{

    constructor(error:any){
        let message = "DataBase error = " + error;
        super(TipoErrorAplicacion.DataBaseError,message);
    }
}