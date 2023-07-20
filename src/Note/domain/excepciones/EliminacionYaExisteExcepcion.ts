import { TipoError } from '../../../Shared/domain/Shared_App_Exceptions/TipoErrorAplicacion';
import { AbstractException } from '../../../Shared/domain/Shared_App_Exceptions/AbstractException';


export class EliminacionYaExisteExcepcion extends AbstractException{

    constructor(){
        let message = "No se puede modificar la fecha de eliminacion de una nota";
        super(TipoError.ActualizacionNota,message);
    }
}