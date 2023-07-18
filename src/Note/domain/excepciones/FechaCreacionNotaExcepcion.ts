import { AbstractException } from "src/Shared/application/Shared_App_Exceptions/AbstractException";
import { TipoErrorAplicacion } from "src/Shared/application/Shared_App_Exceptions/TipoErrorAplicacion";

export class FechaCreacionNotaExcepcion extends AbstractException{

    constructor(){
        let message = "Fecha de creación de Nota inválida";
        super(TipoErrorAplicacion.CreacionNota,message);
    }
}