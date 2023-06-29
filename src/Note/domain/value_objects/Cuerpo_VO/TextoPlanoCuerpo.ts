import { IValueObject } from "src/Shared/domain/IValueObject";
import { TipoParteCuerpo } from "./TipoParteCuerpo";
import { ParteCuerpo } from "./ParteCuerpo";
import { EnumAlineacionTexto } from "./EnumAlineacionTexto";

export class TextoPlanoCuerpo extends ParteCuerpo{
    
    private texto:string;
    private size:number;
    private color:number; //hexadecimal
    private alineacion:EnumAlineacionTexto;

    constructor(texto:string, size:number, color:number, alineacion:EnumAlineacionTexto){
        super(TipoParteCuerpo.textoPlano);
        this.texto = texto;
        this.size = size;
        this.color = color;
        this.alineacion = alineacion;
    }

    public equals(other: TextoPlanoCuerpo): boolean{
        if ((this.texto == other.texto) && (this.size == other.size) && (this.color == other.color) && (this.alineacion == other.alineacion))
            return true;
        else
            return false;
    }

    public getParte(): { tipo: TipoParteCuerpo, texto:string, size:number, color:number, alineacion:EnumAlineacionTexto } {
        let parte = {
            tipo:this.tipo,
            texto:this.texto,
            size:this.size,
            color:this.color,
            alineacion:this.alineacion
        };

        return parte;
    }
}