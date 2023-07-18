import { AbstractException } from "src/Shared/application/Shared_App_Exceptions/AbstractException";
import { TipoErrorAplicacion } from "src/Shared/application/Shared_App_Exceptions/TipoErrorAplicacion";

export class IdUserExcepcion extends AbstractException{

    constructor(){
        let message = "Id de Usuario inválido";
        super(TipoErrorAplicacion.idUser,message);
    }
}