import { TipoParteCuerpo } from "../value_objects/Cuerpo_VO/TipoParteCuerpo";
 /*textoPlano, textoCursiva, textoEnNegrita, textoSubrayado, Imagen, NotaDeVoz, Tarea*/
export class ParteCuerpoSnapshot{
    tipo:string

    constructor(tipo:TipoParteCuerpo){
        this.tipo = this.transformarAString(tipo);
    }
    
    private transformarAString(t:TipoParteCuerpo):string{
        switch(t){
            case TipoParteCuerpo.textoPlano:
                return "Texto Plano";
            break;

            case TipoParteCuerpo.textoCursiva:
                return "Texto Cursiva";
            break;

            case TipoParteCuerpo.textoEnNegrita:
                return "Texto Negrita";
            break;

            case TipoParteCuerpo.textoSubrayado:
                return "Texto Subrayado";
            break;

            case TipoParteCuerpo.Imagen:
                return "Imagen";
            break;

            case TipoParteCuerpo.NotaDeVoz:
                return "Nota De Voz";
            break;

            case TipoParteCuerpo.Tarea:
                return "Tarea";
            break;


        }
    }

    static transformarATipo(s:string):TipoParteCuerpo{
        switch(s){
            case "Texto Plano":
                return TipoParteCuerpo.textoPlano;
            break;

            case "Texto Cursiva":
                return TipoParteCuerpo.textoCursiva;
            break;

            case "Texto Negrita":
                return TipoParteCuerpo.textoEnNegrita;
            break;

            case "Texto Subrayado":
                return TipoParteCuerpo.textoSubrayado;
            break;

            case "Imagen":
                return TipoParteCuerpo.Imagen;
            break;

            case "Nota De Voz":
                return TipoParteCuerpo.NotaDeVoz;
            break;

            case "Tarea":
                return TipoParteCuerpo.Tarea;
            break;

            default:
                throw new Error();
            break;


        }
    }

    getTipo():TipoParteCuerpo{
        return ParteCuerpoSnapshot.transformarATipo(this.tipo);
    }
}