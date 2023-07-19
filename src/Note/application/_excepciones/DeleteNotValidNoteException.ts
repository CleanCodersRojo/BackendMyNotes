import { IdNota } from "src/Note/domain/value_objects/IdNota";
import { TipoError } from '../../../Shared/domain/Shared_App_Exceptions/TipoErrorAplicacion';
import { AbstractException } from '../../../Shared/domain/Shared_App_Exceptions/AbstractException';

export class DeleteNotValidNoteException extends AbstractException{

    constructor(id:IdNota){
        let message = "Nota inválidad: " + id.getId() + " eliminada";
        super(TipoError.DeleteNotValidNote,message);
    }
}