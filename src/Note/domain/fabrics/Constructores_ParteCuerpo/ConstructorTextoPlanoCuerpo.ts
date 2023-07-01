import { TextoPlanoSnapshot } from "../../Snapshot/TextoPlanoSnapshot";
import { EnumAlineacionTexto } from "../../value_objects/Cuerpo_VO/EnumAlineacionTexto";
import { ParteCuerpo } from "../../value_objects/Cuerpo_VO/ParteCuerpo";
import { TextoPlanoCuerpo } from "../../value_objects/Cuerpo_VO/TextoPlanoCuerpo";
import { TipoParteCuerpo } from "../../value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ConstructorParteCuerpo } from "../ConstructorParteCuerpo";

export class ConstructorTextoPlanoCuerpo implements ConstructorParteCuerpo{
    
    public fabricar(parte: TextoPlanoSnapshot):ParteCuerpo{
        return new TextoPlanoCuerpo(parte.texto, parte.size, parte.color, parte.alineacion);
    }

    public newSnapshot(texto:string, size:number, color:number, alineacion:number):TextoPlanoSnapshot{
        return new TextoPlanoSnapshot(TipoParteCuerpo.textoPlano, texto, size, color, alineacion);
    }

}