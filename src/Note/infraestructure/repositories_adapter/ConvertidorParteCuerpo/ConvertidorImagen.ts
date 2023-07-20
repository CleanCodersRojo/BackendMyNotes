import { ParteCuerpoSnapshot } from "../../../domain/Snapshot/ParteCuerpoSnapshot";
import { ConvertidorParteCuerpo } from "./ConvertidorParteCuerpo";
import { Document } from "mongodb";
import { ConstructorImagenCuerpo } from "../../../domain/fabrics/FabricaImagen/ConstructorImagenCuerpo";

export class ConvertidorImagen implements ConvertidorParteCuerpo{
    convertir(partemodel:Document):ParteCuerpoSnapshot{
        return (new ConstructorImagenCuerpo).newSnapshot(partemodel.url);
    }
}