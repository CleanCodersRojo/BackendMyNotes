import { HttpException, HttpStatus } from "@nestjs/common";
import { ExceptionHandler } from "./ExceptionHandler";
import { TipoError } from "../../domain/Shared_App_Exceptions/TipoErrorAplicacion";

export class ConstructorExceptionHandler{
    static construir(): ExceptionHandler{
        let handler:ExceptionHandler = new ExceptionHandler();
        handler.addHttpException(HttpStatus.NO_CONTENT, TipoError.NotFound);
        handler.addHttpException(HttpStatus.BAD_REQUEST, TipoError.idNota);
        handler.addHttpException(HttpStatus.BAD_REQUEST, TipoError.ActualizacionNota);
        handler.addHttpException(HttpStatus.BAD_REQUEST, TipoError.CreacionNota);
        handler.addHttpException(HttpStatus.BAD_REQUEST, TipoError.TituloNota);
        handler.addHttpException(HttpStatus.BAD_REQUEST, TipoError.idNota);
        handler.addHttpException(HttpStatus.BAD_REQUEST, TipoError.idUser);
        handler.addHttpException(HttpStatus.INTERNAL_SERVER_ERROR, TipoError.DataBaseError);
        handler.addHttpException(HttpStatus.PARTIAL_CONTENT, TipoError.DeleteNotValidNote);
        handler.addHttpException(HttpStatus.BAD_REQUEST, TipoError.EliminacionYaExiste);
        handler.addHttpException(HttpStatus.BAD_REQUEST, TipoError.UbicacionYaExiste);

        return handler;
    }




}