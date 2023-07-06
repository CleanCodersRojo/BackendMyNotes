import { EnumAlineacionTexto } from "../value_objects/Cuerpo_VO/EnumAlineacionTexto";
import { TipoParteCuerpo } from "../value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ParteCuerpoSnapshot } from "./ParteCuerpoSnapshot";


export class ImagenSnapshot extends ParteCuerpoSnapshot{
    bytes:Uint8Array;

    constructor(bytes:Uint8Array){
        super(TipoParteCuerpo.Imagen);
        this.bytes = bytes;
    }
}