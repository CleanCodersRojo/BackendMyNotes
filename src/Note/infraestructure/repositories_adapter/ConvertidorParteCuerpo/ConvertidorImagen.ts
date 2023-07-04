import { ParteCuerpoSnapshot } from "src/Note/domain/Snapshot/ParteCuerpoSnapshot";
import { ConvertidorParteCuerpo } from "./ConvertidorParteCuerpo";
import { ConstructorTextoPlanoCuerpo } from "src/Note/domain/fabrics/FabricaTexto/ConstructorTextoPlanoCuerpo";
import { Document } from "mongodb";
import { ConstructorImagenCuerpo } from "src/Note/domain/fabrics/FabricaImagen/ConstructorImagenCuerpo";

export class ConvertidorImagen implements ConvertidorParteCuerpo{
    convertir(partemodel:Document):ParteCuerpoSnapshot{
        return (new ConstructorImagenCuerpo).newSnapshot(partemodel.bytes);
    }
}