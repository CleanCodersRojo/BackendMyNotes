import { EnumAlineacionTexto } from "../../value_objects/Cuerpo_VO/EnumAlineacionTexto";
import { ParteCuerpo } from "../../value_objects/Cuerpo_VO/ParteCuerpo";
import { TextoPlanoCuerpo } from "../../value_objects/Cuerpo_VO/TextoPlanoCuerpo";
import { TipoParteCuerpo } from "../../value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ConstructorParteCuerpo } from "../ConstructorParteCuerpo";

export class ConstructorTextoPlanoCuerpo implements ConstructorParteCuerpo{
    
    fabricar(parte: { tipo: TipoParteCuerpo, texto:string, size:number, color:number, alineacion:EnumAlineacionTexto }):ParteCuerpo{
        return new TextoPlanoCuerpo(parte.texto, parte.size, parte.color, parte.alineacion);
    }

}