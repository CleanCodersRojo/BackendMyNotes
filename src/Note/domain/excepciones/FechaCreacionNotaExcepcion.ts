import { AbstractException } from "../../../Shared/application/Shared_App_Exceptions/AbstractException";
import { TipoErrorAplicacion } from "../../../Shared/application/Shared_App_Exceptions/TipoErrorAplicacion";

export class FechaCreacionNotaExcepcion extends AbstractException{

    constructor(){
        let message = "Fecha de creación de Nota inválida";
        super(TipoErrorAplicacion.CreacionNota,message);
    }
}