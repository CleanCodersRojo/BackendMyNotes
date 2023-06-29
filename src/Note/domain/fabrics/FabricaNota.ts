import { Optional } from "src/Shared/utilities/Optional";
import { Nota } from "../Nota";
import { TituloNota } from "../value_objects/TituloNota";
import { IdNota } from "../value_objects/IdNota";
import { CuerpoNota } from "../value_objects/CuerpoNota";
import { FechaNota } from "../value_objects/FechaNota";
import { UbicacionNota } from "../value_objects/UbicacionNota";
import { IdUser } from "src/User/domain/value_objects/IdUser";
import { NotaSnapshot } from "src/Note/domain/NotaSnapshot";
import { TipoParteCuerpo } from "../value_objects/Cuerpo_VO/TipoParteCuerpo";
import { ParteCuerpo } from "../value_objects/Cuerpo_VO/ParteCuerpo";
import { FabricaCuerpo } from "./FabricaCuerpo";
import { ConstructorImagenCuerpo } from "./Constructores_ParteCuerpo/ConstructorImagenCuerpo";
import { TextoPlanoCuerpo } from '../value_objects/Cuerpo_VO/TextoPlanoCuerpo';
import { ConstructorTextoPlanoCuerpo } from "./Constructores_ParteCuerpo/ConstructorTextoPlanoCuerpo";

export class FabricaNota {
    static fabricar(id:string, titulo:string, cuerpo:Array<{tipo:TipoParteCuerpo}>, fechaCreacion:Date, fechaEliminacion:Optional<Date>, fechaActualizacion:Date,
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

    static fabricarCuerpo(cuerpo:Array<{tipo:TipoParteCuerpo}>):CuerpoNota{
        let nuevocuerpo:Array<ParteCuerpo> = new Array<ParteCuerpo>();
        let fabrica:FabricaCuerpo = new FabricaCuerpo();
        fabrica.addConstructor(TipoParteCuerpo.Imagen,new ConstructorImagenCuerpo());
        fabrica.addConstructor(TipoParteCuerpo.textoPlano,new ConstructorTextoPlanoCuerpo());

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

    static restaurarNota(snapshot:NotaSnapshot):Nota{
        const i:IdNota = new IdNota(snapshot.notaId);
        const t:TituloNota = new TituloNota(snapshot.titulo);
        const c:CuerpoNota = this.fabricarCuerpo(snapshot.cuerpo);
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
}