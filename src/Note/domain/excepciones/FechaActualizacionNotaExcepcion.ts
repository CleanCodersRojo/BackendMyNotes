import { TipoError } from '../../../Shared/domain/Shared_App_Exceptions/TipoErrorAplicacion';
import { AbstractException } from '../../../Shared/domain/Shared_App_Exceptions/AbstractException';

export class FechaActualizacionNotaExcepcion extends AbstractException{

    constructor(){
        let message = "Fecha de actualización de Nota inválida";
        super(TipoError.ActualizacionNota,message);
    }
}