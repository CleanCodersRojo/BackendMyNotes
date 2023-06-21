import { Optional } from "src/core/ortogonal_solutions/Optional";
import { Nota } from "../Nota";
import { TituloNota } from "../value_objects/TituloNota";
import { IdNota } from "../value_objects/IdNota";
import { CuerpoNota } from "../value_objects/CuerpoNota";
import { FechaNota } from "../value_objects/FechaNota";
import { UbicacionNota } from "../value_objects/UbicacionNota";
import { IdUser } from "src/User/domain/value_objects/IdUser";

export class FabricaNota {
    static fabricar(id:string, titulo:string, cuerpo:string, fechaCreacion:Date, fechaEliminacion:Optional<Date>, fechaActualizacion:Date,
                     latitud:Optional<number>, altitud:Optional<number>, usuarioId:string):Nota{

        const i:IdNota = new IdNota(id);
        const t:TituloNota = new TituloNota(titulo);
        const c:CuerpoNota = new CuerpoNota(cuerpo);
        const fc:FechaNota = new FechaNota(fechaCreacion);

        let fe:Optional<FechaNota>;
        if (fechaEliminacion.HasValue())
            fe = new Optional<FechaNota>(new FechaNota(fechaEliminacion.getValue()));
        else
            fe = new Optional<FechaNota>();

        const fa:FechaNota = new FechaNota(fechaActualizacion);
        let ubi:Optional<UbicacionNota>
        if (latitud.HasValue() && altitud.HasValue())
            ubi = new Optional<UbicacionNota>(new UbicacionNota(latitud.getValue(), altitud.getValue()));
        else
            ubi = new Optional<UbicacionNota>();
        const user:IdUser = new IdUser(usuarioId);
    
        return new Nota(i,t,c,fc,fe,fa,ubi,user);
    }

    static fabricarIdNota(id:string):IdNota{
        return new IdNota(id);
    }
}