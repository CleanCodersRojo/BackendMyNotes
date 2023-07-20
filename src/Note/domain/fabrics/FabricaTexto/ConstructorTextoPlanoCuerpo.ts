import { ParteCuerpoSnapshot } from "../../Snapshot/ParteCuerpoSnapshot";
import { TextoPlanoSnapshot } from "../../Snapshot/TextoPlanoSnapshot";
import { EnumAlineacionTexto } from "../../value_objects/Cuerpo_VO/EnumAlineacionTexto";
import { ParteCuerpo } from "../../value_objects/Cuerpo_VO/ParteCuerpo";
import { TextoPlanoCuerpo } from "../../value_objects/Cuerpo_VO/TextoPlanoCuerpo";
import { TipoParteCuerpo } from "../../value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ReceptorTextoCuerpo } from "./ReceptorTextoCuerpo";
import { ConstructorParteCuerpo } from "../Shared_ParteCuerpo/ConstructorParteCuerpo";

export class ConstructorTextoPlanoCuerpo implements ConstructorParteCuerpo{
    
    public fabricar(parte: ReceptorTextoCuerpo):ParteCuerpo{
        return new TextoPlanoCuerpo(parte.texto/*, parte.size, parte.color, parte.alineacion*/);
    }

    restaurar(parte:TextoPlanoSnapshot):ParteCuerpo{
        return new TextoPlanoCuerpo(parte.texto/*, parte.size, parte.color, parte.alineacion*/);
    }


    public newSnapshot(texto:string/*, size:number, color:number, alineacion:number*/):TextoPlanoSnapshot{
        return new TextoPlanoSnapshot(texto/*, size, color, alineacion*/);
    }

}