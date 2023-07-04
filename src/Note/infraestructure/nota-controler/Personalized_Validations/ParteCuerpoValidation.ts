import { ReceptorParteCuerpo } from "src/Note/domain/fabrics/Shared_ParteCuerpo/ReceptorParteCuerpo";
import { TipoParteCuerpo } from "src/Note/domain/value_objects/Cuerpo_VO/TipoParteCuerpo";
import { Optional } from "src/Shared/utilities/Optional";

export class ParteCuerpoValidacion {
    public cuerpoValidacion(cuerpo: Array<ReceptorParteCuerpo>):boolean{
        for(const parte of cuerpo){
            const tipo:Optional<string> = new Optional<string>(<string>parte.tipo);
            if(tipo.HasValue() && this.tipoValidacion(tipo.getValue())){
                
            }
        }
        
        return true;
    }

    private tipoValidacion(value:string):boolean{
        let valid:boolean = false;
        let first:boolean = true;
        for (const tipo of Object.keys(TipoParteCuerpo)) {
            if ((value == TipoParteCuerpo[tipo]) && (first)){
                valid = true;
                first = false;
            }          
        }
        if (!valid){
            return false;
        }

        return true;
    }
}