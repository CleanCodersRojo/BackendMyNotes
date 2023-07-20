import { AbstractException } from "src/Shared/application/Shared_App_Exceptions/AbstractException";
import { TipoErrorAplicacion } from '../../application/Shared_App_Exceptions/TipoErrorAplicacion';
import { HttpException, HttpStatus } from "@nestjs/common";

export class ExceptionHandler{
    private httpExceptions:Map<TipoErrorAplicacion, HttpStatus>;

    constructor(){
        this.httpExceptions = new Map();
    }

    public transform(error:AbstractException):HttpException{
        for (let key of this.httpExceptions.keys()) {
            if (error.getTipo() == key){
                return this.createHttpException(error, this.httpExceptions.get(key));
            }
        }
    }

    public addHttpException(errorhttp:HttpStatus, tipo:TipoErrorAplicacion){
        this.httpExceptions.set(tipo, errorhttp);
    }

    private createHttpException(error:AbstractException, code:HttpStatus):HttpException{
        return new HttpException({
            status: code,
            error: error.getMensaje(),
          }, code);
    }
}