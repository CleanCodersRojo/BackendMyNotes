import { IdNota } from "src/Note/domain/value_objects/IdNota";
import { TipoError } from '../../../Shared/domain/Shared_App_Exceptions/TipoErrorAplicacion';
import { AbstractException } from '../../../Shared/domain/Shared_App_Exceptions/AbstractException';

export class NotFoundException extends AbstractException{

    constructor(id:IdNota){
        let message = "No existe la Nota: " + id.getId();
        super(TipoError.NotFound,message);
    }
}