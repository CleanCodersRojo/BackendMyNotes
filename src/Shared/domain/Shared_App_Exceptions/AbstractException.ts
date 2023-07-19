import { TipoError } from "src/Shared/domain/Shared_App_Exceptions/TipoErrorAplicacion";


export class AbstractException extends Error{
    protected mensaje:string;
    protected tipo:TipoError;

    constructor(tipo:TipoError, msg:string){
        super();
        this.mensaje = msg;
        this.tipo = tipo;
    }

    getMensaje():string{return this.mensaje}
    getTipo():TipoError{return this.tipo}
}