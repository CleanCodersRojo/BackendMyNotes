import { ParteCuerpoSnapshot } from "../../../domain/Snapshot/ParteCuerpoSnapshot";
import { Document } from "mongodb";

export interface ConvertidorParteCuerpo{
    convertir(parte:Document):ParteCuerpoSnapshot;
}