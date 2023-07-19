import { TipoError } from '../../../Shared/domain/Shared_App_Exceptions/TipoErrorAplicacion';
import { AbstractException } from '../../../Shared/domain/Shared_App_Exceptions/AbstractException';

export class IdNotaExcepcion extends AbstractException{

    constructor(){
        let message = "Id de Nota inválido";
        super(TipoError.idNota,message);
    }
}