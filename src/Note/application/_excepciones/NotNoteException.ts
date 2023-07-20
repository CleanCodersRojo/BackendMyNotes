import { IdUser } from "../../../User/domain/value_objects/IdUser";
import { AbstractException } from "../../../Shared/domain/Shared_App_Exceptions/AbstractException";
import { TipoError } from "../../../Shared/domain/Shared_App_Exceptions/TipoErrorAplicacion";

export class NotNoteException extends AbstractException{

    constructor(id:IdUser){
        let message = "El Usuario: " + id.getId() + " no tiene esa nota";
        super(TipoError.NotFound,message);
    }
}