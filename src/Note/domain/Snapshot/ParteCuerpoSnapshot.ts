import { TipoParteCuerpo } from "../value_objects/Cuerpo_VO/TipoParteCuerpo";
 /*textoPlano, textoCursiva, textoEnNegrita, textoSubrayado, Imagen, NotaDeVoz, Tarea*/
export class ParteCuerpoSnapshot{
    private tipo:TipoParteCuerpo

    constructor(tipo:TipoParteCuerpo){
        this.tipo = tipo;
    }
    
    getTipo():TipoParteCuerpo{
        return this.tipo;
    }
}