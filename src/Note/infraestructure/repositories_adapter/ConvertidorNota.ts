import { Document } from "mongodb";
import { NotaSnapshot } from "src/Note/domain/Snapshot/NotaSnapshot";
import { ParteCuerpoSnapshot } from "src/Note/domain/Snapshot/ParteCuerpoSnapshot";
import { ConstructorImagenCuerpo } from "src/Note/domain/fabrics/FabricaImagen/ConstructorImagenCuerpo";
import { ConstructorTextoPlanoCuerpo } from "src/Note/domain/fabrics/FabricaTexto/ConstructorTextoPlanoCuerpo";
import { TipoParteCuerpo } from "src/Note/domain/value_objects/Cuerpo_VO/TipoParteCuerpo";
import { Optional } from "src/Shared/utilities/Optional";
import { ConvertidorCuerpo } from "./ConvertidorCuerpo";

export class ConvertidorNota {
    static convertirASnapshot(notamodel:Document):NotaSnapshot{
        const fe:Optional<Date> = new Optional<Date>(notamodel.fechaEliminacion.value);
        const latitud:Optional<number> = new Optional<number>(notamodel.latitud.value);
        const altitud:Optional<number> = new Optional<number>(notamodel.altitud.value);

        const nota:NotaSnapshot = new NotaSnapshot(notamodel.notaId, notamodel.titulo,
            ConvertidorNota.convertirACuerpoSnapshot(notamodel.cuerpo),
            notamodel.fechaCreacion,fe,
            notamodel.fechaActualizacion, latitud,
            altitud, notamodel.usuarioId);

        return nota;
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