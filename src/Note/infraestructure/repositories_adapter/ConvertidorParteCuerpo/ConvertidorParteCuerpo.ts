import { ParteCuerpoSnapshot } from "src/Note/domain/Snapshot/ParteCuerpoSnapshot";
import { Document } from "mongodb";

export interface ConvertidorParteCuerpo{
    convertir(parte:Document):ParteCuerpoSnapshot;
}