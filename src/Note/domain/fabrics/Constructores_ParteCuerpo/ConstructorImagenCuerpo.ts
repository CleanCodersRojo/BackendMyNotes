import { ImagenSnapshot } from "../../Snapshot/ImagenSnapshot";
import { EnumAlineacionTexto } from "../../value_objects/Cuerpo_VO/EnumAlineacionTexto";
import { ImagenCuerpo } from "../../value_objects/Cuerpo_VO/ImagenCuerpo";
import { ParteCuerpo } from "../../value_objects/Cuerpo_VO/ParteCuerpo";
import { TextoPlanoCuerpo } from "../../value_objects/Cuerpo_VO/TextoPlanoCuerpo";
import { TipoParteCuerpo } from "../../value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ConstructorParteCuerpo } from "../ConstructorParteCuerpo";

export class ConstructorImagenCuerpo implements ConstructorParteCuerpo{
    
    fabricar(parte:ImagenSnapshot):ParteCuerpo{
        return new ImagenCuerpo(parte.bytes);
    }

    public newSnapshot(bytes:string):ImagenSnapshot{
        return new ImagenSnapshot(TipoParteCuerpo.Imagen, bytes);
    }

}