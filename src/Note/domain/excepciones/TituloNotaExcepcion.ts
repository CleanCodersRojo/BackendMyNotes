import { AbstractException } from "src/Shared/application/Shared_App_Exceptions/AbstractException";
import { TipoErrorAplicacion } from "src/Shared/application/Shared_App_Exceptions/TipoErrorAplicacion";

export class TituloNotaExcepcion extends AbstractException{

    constructor(){
        let message = "Titulo de Nota inválido";
        super(TipoErrorAplicacion.TituloNota,message);
    }
}