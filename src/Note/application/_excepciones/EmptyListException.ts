import { AbstractException } from "src/Shared/application/Shared_App_Exceptions/AbstractException";
import { TipoErrorAplicacion } from "src/Shared/application/Shared_App_Exceptions/TipoErrorAplicacion";
import { IdUser } from "src/User/domain/value_objects/IdUser";

export class EmptyListException extends AbstractException{

    constructor(id:IdUser){
        let message = "El Usuario: " + id.getId() + " no tiene notas";
        super(TipoErrorAplicacion.NotFound,message);
    }
}