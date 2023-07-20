import { IdNota } from "../../domain/value_objects/IdNota";
import { AbstractException } from "../../../Shared/domain/Shared_App_Exceptions/AbstractException";
import { TipoError } from "../../../Shared/domain/Shared_App_Exceptions/TipoErrorAplicacion";

export class NotFoundException extends AbstractException{

    constructor(id:IdNota){
        let message = "No existe la Nota: " + id.getId();
        super(TipoError.NotFound,message);
    }
}