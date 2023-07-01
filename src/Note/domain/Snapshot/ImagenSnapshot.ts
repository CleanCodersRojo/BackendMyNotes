import { EnumAlineacionTexto } from "../value_objects/Cuerpo_VO/EnumAlineacionTexto";
import { TipoParteCuerpo } from "../value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ParteCuerpoSnapshot } from "./ParteCuerpoSnapshot";


export class ImagenSnapshot extends ParteCuerpoSnapshot{
    bytes:string;

    constructor(tipo:TipoParteCuerpo, bytes:string){
        super(tipo);
        this.bytes = bytes;
    }
}