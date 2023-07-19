import { TipoError } from '../../../Shared/domain/Shared_App_Exceptions/TipoErrorAplicacion';
import { AbstractException } from '../../../Shared/domain/Shared_App_Exceptions/AbstractException';
import { IdUser } from "src/User/domain/value_objects/IdUser";

export class NotNoteException extends AbstractException{

    constructor(id:IdUser){
        let message = "El Usuario: " + id.getId() + " no tiene esa nota";
        super(TipoError.NotFound,message);
    }
}