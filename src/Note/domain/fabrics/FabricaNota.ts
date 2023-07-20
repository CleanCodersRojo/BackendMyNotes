import { Optional } from "../../../Shared/utilities/Optional";
import { Nota } from "../Nota";
import { TituloNota } from "../value_objects/TituloNota";
import { IdNota } from "../value_objects/IdNota";
import { CuerpoNota } from "../value_objects/CuerpoNota";
import { FechaNota } from "../value_objects/FechaNota";
import { UbicacionNota } from "../value_objects/UbicacionNota";
import { IdUser } from "../../../User/domain/value_objects/IdUser";
import { ParteCuerpo } from "../value_objects/Cuerpo_VO/ParteCuerpo";
import { FabricaCuerpo } from "./Shared_ParteCuerpo/FabricaCuerpo";
import { ReceptorParteCuerpo } from "./Shared_ParteCuerpo/ReceptorParteCuerpo";


/*¡¡¡¡¡Mejorar Fabrica utilizando Either en los metodos de fabricacion, pues algo puede arrojar un excepcion de dominio!!!! */
export class FabricaNota {
    static fabricar(id:string, titulo:string, cuerpo:Array<ReceptorParteCuerpo>, fechaCreacion:Date, fechaEliminacion:Optional<Date>, fechaActualizacion:Date,
                     latitud:Optional<number>, altitud:Optional<number>, usuarioId:string):Nota{

        const i:IdNota = new IdNota(id);
        const t:TituloNota = new TituloNota(titulo);
        const c:CuerpoNota = this.fabricarCuerpo(cuerpo);
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

    static fabricarTitulo(titulo:string):TituloNota{
        return new TituloNota(titulo);
    }

    static fabricarCuerpo(cuerpo:Array<ReceptorParteCuerpo>):CuerpoNota{
        let nuevocuerpo:Array<ParteCuerpo> = new Array<ParteCuerpo>();
        let fabrica:FabricaCuerpo = new FabricaCuerpo();
        
        for (const parte of cuerpo){
            let p:ParteCuerpo = fabrica.fabricar(parte);
            nuevocuerpo.push(p);
        }
        return new CuerpoNota(nuevocuerpo);
    }
    
    static fabricarFecha(fecha:Date):FechaNota{
        return new FechaNota(fecha);
    }

    static fabricarUbicacion(latitud:number,altitud:number):UbicacionNota{
        return new UbicacionNota(latitud, altitud);
    }
}