import { TipoParteCuerpo } from "../value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ParteCuerpoSnapshot } from "./ParteCuerpoSnapshot";


export class TextoPlanoSnapshot extends ParteCuerpoSnapshot{
    texto:string;
    /*size:number;
    color:number;
    alineacion:EnumAlineacionTexto; */

    constructor(texto:string/*, size:number, color:number, alineacion:number*/){
        super(TipoParteCuerpo.textoPlano);
        this.texto = texto;
        /*this.size = size;
        this.color = color;
        this.alineacion = alineacion;*/
    }
}