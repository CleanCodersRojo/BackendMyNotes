import { Document } from "mongodb";
import { NotaSnapshot } from "src/Note/domain/NotaSnapshot";
import { Optional } from "src/Shared/utilities/Optional";

export class ConvertidorNota {
    static convertirASnapshot(notamodel:Document):NotaSnapshot{
        const fe:Optional<Date> = new Optional<Date>(notamodel.fechaEliminacion.value);
        const latitud:Optional<number> = new Optional<number>(notamodel.latitud.value);
        const altitud:Optional<number> = new Optional<number>(notamodel.altitud.value);

        const nota:NotaSnapshot = new NotaSnapshot(notamodel.notaId, notamodel.titulo,notamodel.cuerpo,
            notamodel.fechaCreacion,fe,
            notamodel.fechaActualizacion, latitud,
            altitud, notamodel.usuarioId);

        return nota;
    }
}