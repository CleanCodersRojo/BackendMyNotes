import { ParteCuerpoSnapshot } from "src/Note/domain/Snapshot/ParteCuerpoSnapshot";
import { ConvertidorParteCuerpo } from "./ConvertidorParteCuerpo";
import { ConstructorTextoPlanoCuerpo } from "src/Note/domain/fabrics/FabricaTexto/ConstructorTextoPlanoCuerpo";
import { Document } from "mongodb";

export class ConvertidorTexto implements ConvertidorParteCuerpo{
    convertir(partemodel:Document):ParteCuerpoSnapshot{
        return (new ConstructorTextoPlanoCuerpo).newSnapshot(partemodel.texto/*, parte.size, parte.color, parte.alineacion*/);
    }
}