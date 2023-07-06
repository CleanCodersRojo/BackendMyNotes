import { ReceptorParteCuerpo } from "src/Note/domain/fabrics/Shared_ParteCuerpo/ReceptorParteCuerpo";
import { ParteCuerpoDTO } from "../DTOs/ParteCuerpoDTO";

export interface ValidacionParteCuerpo{
    esValido(parte:ParteCuerpoDTO):boolean;
}