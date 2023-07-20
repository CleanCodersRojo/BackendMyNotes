import { ParteCuerpoSnapshot } from "../../../domain/Snapshot/ParteCuerpoSnapshot";
import { ConvertidorParteCuerpo } from "./ConvertidorParteCuerpo";
import { ConstructorTextoPlanoCuerpo } from "../../../domain/fabrics/FabricaTexto/ConstructorTextoPlanoCuerpo";
import { Document } from "mongodb";

export class ConvertidorTexto implements ConvertidorParteCuerpo{
    convertir(partemodel:Document):ParteCuerpoSnapshot{
        return (new ConstructorTextoPlanoCuerpo).newSnapshot(partemodel.texto/*, parte.size, parte.color, parte.alineacion*/);
    }
}