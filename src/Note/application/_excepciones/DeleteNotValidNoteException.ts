import { IdNota } from "../../domain/value_objects/IdNota";
import { AbstractException } from "../../../Shared/application/Shared_App_Exceptions/AbstractException";
import { TipoErrorAplicacion } from "../../../Shared/application/Shared_App_Exceptions/TipoErrorAplicacion";

export class DeleteNotValidNoteException extends AbstractException{

    constructor(id:IdNota){
        let message = "Nota inválidad: " + id.getId() + " eliminada";
        super(TipoErrorAplicacion.DeleteNotValidNote,message);
    }
}