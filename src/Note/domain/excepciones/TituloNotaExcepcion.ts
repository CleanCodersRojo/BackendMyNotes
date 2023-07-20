import { AbstractException } from "../../../Shared/application/Shared_App_Exceptions/AbstractException";
import { TipoErrorAplicacion } from "../../../Shared/application/Shared_App_Exceptions/TipoErrorAplicacion";

export class TituloNotaExcepcion extends AbstractException{

    constructor(){
        let message = "Titulo de Nota inválido";
        super(TipoErrorAplicacion.TituloNota,message);
    }
}