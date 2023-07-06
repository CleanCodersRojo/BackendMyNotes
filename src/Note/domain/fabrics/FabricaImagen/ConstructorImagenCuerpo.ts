import { ImagenSnapshot } from "../../Snapshot/ImagenSnapshot";
import { EnumAlineacionTexto } from "../../value_objects/Cuerpo_VO/EnumAlineacionTexto";
import { ImagenCuerpo } from "../../value_objects/Cuerpo_VO/ImagenCuerpo";
import { ParteCuerpo } from "../../value_objects/Cuerpo_VO/ParteCuerpo";
import { TextoPlanoCuerpo } from "../../value_objects/Cuerpo_VO/TextoPlanoCuerpo";
import { TipoParteCuerpo } from "../../value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ReceptorImagenCuerpo } from "./ReceptorImagenCuerpo";
import { ConstructorParteCuerpo } from "../Shared_ParteCuerpo/ConstructorParteCuerpo";

export class ConstructorImagenCuerpo implements ConstructorParteCuerpo{
    
    fabricar(parte:ReceptorImagenCuerpo):ParteCuerpo{
        return new ImagenCuerpo(parte.bytes);
    }

    restaurar(parte:ImagenSnapshot):ParteCuerpo{
        return new ImagenCuerpo(parte.bytes/*, parte.size, parte.color, parte.alineacion*/);
    }

    public newSnapshot(bytes:Uint8Array):ImagenSnapshot{
        return new ImagenSnapshot(bytes);
    }

}