import { ParteCuerpoDTO } from "../DTOs/ParteCuerpoDTO";

export interface ValidacionParteCuerpo{
    esValido(parte:ParteCuerpoDTO):boolean;
}