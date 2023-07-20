import { ImagenSnapshot } from "../../Snapshot/ImagenSnapshot";
import { EnumAlineacionTexto } from "../../value_objects/Cuerpo_VO/EnumAlineacionTexto";
import { ImagenCuerpo } from "../../value_objects/Cuerpo_VO/ImagenCuerpo";
import { ParteCuerpo } from "../../value_objects/Cuerpo_VO/ParteCuerpo";
import { ReceptorImagenCuerpo } from "./ReceptorImagenCuerpo";
import { ConstructorParteCuerpo } from "../Shared_ParteCuerpo/ConstructorParteCuerpo";

export class ConstructorImagenCuerpo implements ConstructorParteCuerpo{
    
    fabricar(parte:ReceptorImagenCuerpo):ParteCuerpo{
        return new ImagenCuerpo(parte.url);
    }

    restaurar(parte:ImagenSnapshot):ParteCuerpo{
        return new ImagenCuerpo(parte.url/*, parte.size, parte.color, parte.alineacion*/);
    }

    public newSnapshot(url:string):ImagenSnapshot{
        return new ImagenSnapshot(url);
    }

}