import { TipoError } from '../../../Shared/domain/Shared_App_Exceptions/TipoErrorAplicacion';
import { AbstractException } from '../../../Shared/domain/Shared_App_Exceptions/AbstractException';


export class UbicacionYaExisteExcepcion extends AbstractException{

    constructor(){
        let message = "No se puede modificar la ubicacion de una nota";
        super(TipoError.UbicacionYaExiste,message);
    }
}