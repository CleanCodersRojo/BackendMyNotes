import { AbstractException } from "../../../Shared/application/Shared_App_Exceptions/AbstractException";
import { TipoErrorAplicacion } from "../../../Shared/application/Shared_App_Exceptions/TipoErrorAplicacion";

export class IdUserExcepcion extends AbstractException{

    constructor(){
        let message = "Id de Usuario inválido";
        super(TipoErrorAplicacion.idUser,message);
    }
}