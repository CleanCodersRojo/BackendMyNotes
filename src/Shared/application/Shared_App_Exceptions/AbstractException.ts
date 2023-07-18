import { TipoErrorAplicacion } from "./TipoErrorAplicacion";

export class AbstractException extends Error{
    protected mensaje:string;
    protected tipo:TipoErrorAplicacion;

    constructor(tipo:TipoErrorAplicacion, msg:string){
        super();
        this.mensaje = msg;
        this.tipo = tipo;
    }

    getMensaje():string{return this.mensaje}
    getTipo():TipoErrorAplicacion{return this.tipo}
}