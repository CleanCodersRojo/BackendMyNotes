import { HttpException, HttpStatus } from "@nestjs/common";
import { ExceptionHandler } from "./ExceptionHandler";
import { TipoErrorAplicacion } from "../../application/Shared_App_Exceptions/TipoErrorAplicacion";

export class ConstructorExceptionHandler{
    static construir(): ExceptionHandler{
        let handler:ExceptionHandler = new ExceptionHandler();
        handler.addHttpException(HttpStatus.NO_CONTENT, TipoErrorAplicacion.NotFound);
        handler.addHttpException(HttpStatus.BAD_REQUEST, TipoErrorAplicacion.idNota);
        handler.addHttpException(HttpStatus.BAD_REQUEST, TipoErrorAplicacion.ActualizacionNota);
        handler.addHttpException(HttpStatus.BAD_REQUEST, TipoErrorAplicacion.CreacionNota);
        handler.addHttpException(HttpStatus.BAD_REQUEST, TipoErrorAplicacion.TituloNota);
        handler.addHttpException(HttpStatus.BAD_REQUEST, TipoErrorAplicacion.idNota);
        handler.addHttpException(HttpStatus.BAD_REQUEST, TipoErrorAplicacion.idUser);
        handler.addHttpException(HttpStatus.INTERNAL_SERVER_ERROR, TipoErrorAplicacion.DataBaseError);
        handler.addHttpException(HttpStatus.PARTIAL_CONTENT, TipoErrorAplicacion.DeleteNotValidNote);

        return handler;
    }




}