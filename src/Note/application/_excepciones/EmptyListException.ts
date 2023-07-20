import { TipoError } from '../../../Shared/domain/Shared_App_Exceptions/TipoErrorAplicacion';
import { AbstractException } from '../../../Shared/domain/Shared_App_Exceptions/AbstractException';
import { IdUser } from "../../../User/domain/value_objects/IdUser";

export class EmptyListException extends AbstractException{

    constructor(id:IdUser){
        let message = "El Usuario: " + id.getId() + " no tiene notas";
        super(TipoError.NotFound,message);
    }
}