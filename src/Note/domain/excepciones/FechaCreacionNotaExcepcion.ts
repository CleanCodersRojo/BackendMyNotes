import { TipoError } from '../../../Shared/domain/Shared_App_Exceptions/TipoErrorAplicacion';
import { AbstractException } from '../../../Shared/domain/Shared_App_Exceptions/AbstractException';

export class FechaCreacionNotaExcepcion extends AbstractException{

    constructor(){
        let message = "Fecha de creación de Nota inválida";
        super(TipoError.CreacionNota,message);
    }
}