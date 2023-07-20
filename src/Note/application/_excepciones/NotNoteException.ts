import { IdUser } from "../../../User/domain/value_objects/IdUser";
import { IdNota } from "../../domain/value_objects/IdNota";
import { AbstractException } from "../../../Shared/application/Shared_App_Exceptions/AbstractException";
import { TipoErrorAplicacion } from "../../../Shared/application/Shared_App_Exceptions/TipoErrorAplicacion";

export class NotNoteException extends AbstractException{

    constructor(id:IdUser){
        let message = "El Usuario: " + id.getId() + " no tiene esa nota";
        super(TipoErrorAplicacion.NotFound,message);
    }
}