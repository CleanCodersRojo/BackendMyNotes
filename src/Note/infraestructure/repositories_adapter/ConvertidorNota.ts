import { Document } from "mongodb";
import { NotaSnapshot } from "../../domain/Snapshot/NotaSnapshot";
import { ParteCuerpoSnapshot } from "../../domain/Snapshot/ParteCuerpoSnapshot";
import { TipoParteCuerpo } from "../../domain/value_objects/Cuerpo_VO/TipoParteCuerpo";
import { Optional } from "../../../Shared/utilities/Optional";
import { ConvertidorCuerpo } from "./ConvertidorCuerpo";
import { Either } from "../../../Shared/utilities/Either";
import { FechaActualizacionNotaExcepcion } from "../../domain/excepciones/FechaActualizacionNotaExcepcion";
import { FechaCreacionNotaExcepcion } from "../../domain/excepciones/FechaCreacionNotaExcepcion";
import { TituloNotaExcepcion } from "../../domain/excepciones/TituloNotaExcepcion";
import { IdNotaExcepcion } from "../../domain/excepciones/IdNotaExcepcion";
import { IdUserExcepcion } from "../../domain/excepciones/IdUserException";

export class ConvertidorNota {
    static convertirASnapshot(notamodel:Document):Either<NotaSnapshot,Error>{
        const fe:Optional<Date> = new Optional<Date>(notamodel.fechaEliminacion.value);
        const latitud:Optional<number> = new Optional<number>(notamodel.latitud.value);
        const altitud:Optional<number> = new Optional<number>(notamodel.altitud.value);

        /*Verificar que algun valor sea nulo*/
        const userAux:Optional<string> = new Optional<string>(notamodel.usuarioId);
        if (!userAux.HasValue())
            return Either.makeRight<NotaSnapshot,Error>(new IdUserExcepcion());
        const idAux:Optional<string> = new Optional<string>(notamodel.notaId); 
        if (!idAux.HasValue())
            return Either.makeRight<NotaSnapshot,Error>(new IdNotaExcepcion());
        const tituloAux:Optional<string> = new Optional<string>(notamodel.titulo);
        if (!tituloAux.HasValue())
            return Either.makeRight<NotaSnapshot,Error>(new TituloNotaExcepcion());
        const creacionAux:Optional<Date> = new Optional<Date>(notamodel.fechaCreacion);
        if (!creacionAux.HasValue())
            return Either.makeRight<NotaSnapshot,Error>(new FechaCreacionNotaExcepcion());
        const actualizacionAux:Optional<Date> = new Optional<Date>(notamodel.fechaActualizacion);
        if (!actualizacionAux.HasValue())
            return Either.makeRight<NotaSnapshot,Error>(new FechaActualizacionNotaExcepcion());        
            
        //==================================//

        const nota:NotaSnapshot = new NotaSnapshot(notamodel.notaId, notamodel.titulo,
            ConvertidorNota.convertirACuerpoSnapshot(notamodel.cuerpo),
            notamodel.fechaCreacion,fe,
            notamodel.fechaActualizacion, latitud,
            altitud, notamodel.usuarioId);
        return Either.makeLeft<NotaSnapshot,Error>(nota);
    }

    private static convertirACuerpoSnapshot(cuerpomodel:Document[]):Array<ParteCuerpoSnapshot>{
        let cuerpo:Array<ParteCuerpoSnapshot> = new Array<ParteCuerpoSnapshot>();
        const convertidor:ConvertidorCuerpo = new ConvertidorCuerpo();
        
        for (const parte of cuerpomodel) {
            const tipo:Optional<TipoParteCuerpo> = new Optional<TipoParteCuerpo>(parte.tipo);

            if (tipo.HasValue()){
                const partesnapshot:ParteCuerpoSnapshot = convertidor.convertir(parte);
                cuerpo.push(partesnapshot);
            }
        }
        return cuerpo;
    }
}