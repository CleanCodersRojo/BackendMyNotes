import { TipoParteCuerpo } from "./TipoParteCuerpo";
import { ParteCuerpo } from "./ParteCuerpo";
import { TextoPlanoSnapshot } from "../../Snapshot/TextoPlanoSnapshot";
import { ConstructorTextoPlanoCuerpo } from "../../fabrics/FabricaTexto/ConstructorTextoPlanoCuerpo";

export class TextoPlanoCuerpo extends ParteCuerpo{
    
    private texto:string;
    /*private size:number;
    private color:number; //hexadecimal
    private alineacion:EnumAlineacionTexto;*/

    constructor(texto:string/*, size:number, color:number, alineacion:EnumAlineacionTexto*/){
        super(TipoParteCuerpo.textoPlano);
        this.texto = texto;
        /*this.size = size;
        this.color = color;
        this.alineacion = alineacion;*/
    }

    public equals(other: TextoPlanoCuerpo): boolean{
        if ((this.texto == other.texto) 
        /*&& (this.size == other.size) && (this.color == other.color) && (this.alineacion == other.alineacion)*/)
            return true;
        else
            return false;
    }

    public getParteSnapshot(): TextoPlanoSnapshot {
        const constructor:ConstructorTextoPlanoCuerpo = new ConstructorTextoPlanoCuerpo();
        return constructor.newSnapshot(this.texto/*,this.size,this.color,this.alineacion*/);
    }
}