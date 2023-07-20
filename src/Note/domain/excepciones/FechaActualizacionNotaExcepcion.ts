import { AbstractException } from "../../../Shared/application/Shared_App_Exceptions/AbstractException";
import { TipoErrorAplicacion } from "../../../Shared/application/Shared_App_Exceptions/TipoErrorAplicacion";
export class FechaActualizacionNotaExcepcion extends AbstractException{

    constructor(){
        let message = "Fecha de actualización de Nota inválida";
        super(TipoErrorAplicacion.ActualizacionNota,message);
    }
}