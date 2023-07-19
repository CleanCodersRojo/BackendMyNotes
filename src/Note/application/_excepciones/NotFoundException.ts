import { IdNota } from "src/Note/domain/value_objects/IdNota";
import { AbstractException } from "src/Shared/application/Shared_App_Exceptions/AbstractException";
import { TipoErrorAplicacion } from "src/Shared/application/Shared_App_Exceptions/TipoErrorAplicacion";

export class NotFoundException extends AbstractException{

    constructor(id:IdNota){
        let message = "No existe la Nota: " + id.getId();
        super(TipoErrorAplicacion.NotFound,message);
    }
}