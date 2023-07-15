import { EnumAlineacionTexto } from "../value_objects/Cuerpo_VO/EnumAlineacionTexto";
import { TipoParteCuerpo } from "../value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ParteCuerpoSnapshot } from "./ParteCuerpoSnapshot";


export class ImagenSnapshot extends ParteCuerpoSnapshot{
    url:string;

    constructor(url:string){
        super(TipoParteCuerpo.Imagen);
        this.url = url;
    }
}