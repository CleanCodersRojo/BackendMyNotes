import { Document } from "mongodb";
import { NotaSnapshot } from "src/Note/domain/Snapshot/NotaSnapshot";
import { ParteCuerpoSnapshot } from "src/Note/domain/Snapshot/ParteCuerpoSnapshot";
import { ConstructorImagenCuerpo } from "src/Note/domain/fabrics/Constructores_ParteCuerpo/ConstructorImagenCuerpo";
import { ConstructorTextoPlanoCuerpo } from "src/Note/domain/fabrics/Constructores_ParteCuerpo/ConstructorTextoPlanoCuerpo";
import { TipoParteCuerpo } from "src/Note/domain/value_objects/Cuerpo_VO/TipoParteCuerpo";
import { Optional } from "src/Shared/utilities/Optional";

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

    static convertirACuerpoSnapshot(cuerpomodel:Document[]):Array<ParteCuerpoSnapshot>{
        let cuerpo:Array<ParteCuerpoSnapshot> = new Array<ParteCuerpoSnapshot>();
        for (const parte of cuerpomodel) {
            const tipo:TipoParteCuerpo = ParteCuerpoSnapshot.transformarATipo(parte.tipo);

            ///TEMPORAL///
            switch(tipo){
                case TipoParteCuerpo.textoPlano:
                    cuerpo.push((new ConstructorTextoPlanoCuerpo).newSnapshot(parte.texto, parte.size, parte.color, parte.alineacion));
                break;

                case TipoParteCuerpo.textoCursiva:
                break;

                case TipoParteCuerpo.textoEnNegrita:
                break;

                case TipoParteCuerpo.textoSubrayado:
                break;

                case TipoParteCuerpo.Imagen:
                    cuerpo.push((new ConstructorImagenCuerpo).newSnapshot(parte.bytes));
                break;

                case TipoParteCuerpo.NotaDeVoz:
                break;

                case TipoParteCuerpo.Tarea:
                break;
            }
            //////////////
            
        }



        return cuerpo;

    }
}