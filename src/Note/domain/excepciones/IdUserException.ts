import { TipoError } from '../../../Shared/domain/Shared_App_Exceptions/TipoErrorAplicacion';
import { AbstractException } from '../../../Shared/domain/Shared_App_Exceptions/AbstractException';

export class IdUserExcepcion extends AbstractException{

    constructor(){
        let message = "Id de Usuario inválido";
        super(TipoError.idUser,message);
    }
}