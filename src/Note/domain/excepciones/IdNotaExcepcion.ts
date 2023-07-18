import { AbstractException } from "src/Shared/application/Shared_App_Exceptions/AbstractException";
import { TipoErrorAplicacion } from "src/Shared/application/Shared_App_Exceptions/TipoErrorAplicacion";

export class IdNotaExcepcion extends AbstractException{

    constructor(){
        let message = "Id de Nota inválido";
        super(TipoErrorAplicacion.idNota,message);
    }
}