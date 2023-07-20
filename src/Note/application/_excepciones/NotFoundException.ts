import { IdNota } from "../../domain/value_objects/IdNota";
import { AbstractException } from "../../../Shared/application/Shared_App_Exceptions/AbstractException";
import { TipoErrorAplicacion } from "../../../Shared/application/Shared_App_Exceptions/TipoErrorAplicacion";

export class NotFoundException extends AbstractException{

    constructor(id:IdNota){
        let message = "No existe la Nota: " + id.getId();
        super(TipoErrorAplicacion.NotFound,message);
    }
}