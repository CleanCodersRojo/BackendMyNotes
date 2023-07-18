import { Optional } from "src/Shared/utilities/Optional";
import { Nota } from "../Nota";
import { NotaSnapshot } from "../Snapshot/NotaSnapshot";
import { CuerpoNota } from "../value_objects/CuerpoNota";
import { FechaNota } from "../value_objects/FechaNota";
import { IdNota } from "../value_objects/IdNota";
import { TituloNota } from "../value_objects/TituloNota";
import { UbicacionNota } from "../value_objects/UbicacionNota";
import { IdUser } from "src/User/domain/value_objects/IdUser";
import { ParteCuerpoSnapshot } from "../Snapshot/ParteCuerpoSnapshot";
import { ParteCuerpo } from "../value_objects/Cuerpo_VO/ParteCuerpo";
import { FabricaCuerpo } from "./Shared_ParteCuerpo/FabricaCuerpo";

export class FabricaRestaurarNota {
    static restaurarNota(snapshot:NotaSnapshot):Nota{
        const i:IdNota = new IdNota(snapshot.notaId);
        const t:TituloNota = new TituloNota(snapshot.titulo);
        const c:CuerpoNota = this.restaurarCuerpo(snapshot.cuerpo);
        const fc:FechaNota = new FechaNota(snapshot.fechaCreacion);
        
        let fe:Optional<FechaNota>;
        
        if (snapshot.fechaEliminacion.HasValue()){
            fe = new Optional<FechaNota>(new FechaNota(snapshot.fechaEliminacion.getValue()));
        }
        else{
            fe = new Optional<FechaNota>();
        }
        
        const fa:FechaNota = new FechaNota(snapshot.fechaActualizacion);
        
        let ubi:Optional<UbicacionNota>
        if (snapshot.latitud.HasValue() && snapshot.altitud.HasValue()){
            ubi = new Optional<UbicacionNota>(new UbicacionNota(snapshot.latitud.getValue(), snapshot.altitud.getValue()));
        }
        else{
            ubi = new Optional<UbicacionNota>();
        }

        const user:IdUser = new IdUser(snapshot.usuarioId);
        return new Nota(i,t,c,fc,fe,fa,ubi,user);
    }

    static restaurarCuerpo(cuerpo:Array<ParteCuerpoSnapshot>):CuerpoNota{
        let nuevocuerpo:Array<ParteCuerpo> = new Array<ParteCuerpo>();
        let fabrica:FabricaCuerpo = new FabricaCuerpo();
        
        for (const parte of cuerpo){
            let p:ParteCuerpo = fabrica.restaurar(parte);
            nuevocuerpo.push(p);
        }

        return new CuerpoNota(nuevocuerpo);
    }
}