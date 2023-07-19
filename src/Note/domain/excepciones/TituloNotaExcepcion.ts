import { TipoError } from '../../../Shared/domain/Shared_App_Exceptions/TipoErrorAplicacion';
import { AbstractException } from '../../../Shared/domain/Shared_App_Exceptions/AbstractException';

export class TituloNotaExcepcion extends AbstractException{

    constructor(){
        let message = "Titulo de Nota inválido";
        super(TipoError.TituloNota,message);
    }
}