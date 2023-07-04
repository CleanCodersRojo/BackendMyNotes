import { EnumAlineacionTexto } from "../value_objects/Cuerpo_VO/EnumAlineacionTexto";
import { TipoParteCuerpo } from "../value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ParteCuerpoSnapshot } from "./ParteCuerpoSnapshot";


export class ImagenSnapshot extends ParteCuerpoSnapshot{
    bytes:string;

    constructor(bytes:string){
        super(TipoParteCuerpo.Imagen);
        this.bytes = bytes;
    }
}