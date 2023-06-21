import { Either } from "src/core/ortogonal_solutions/Either";
import { IServicio } from "../../../core/application/core_Comandos/IServicio";
import { EliminarNotaComando } from "./EliminarNotaComando";
import { Nota } from "src/Note/domain/Nota";
import { FabricaNota } from "src/Note/domain/fabrics/FabricaNota";
import { MementoNota} from "../../domain/MementoNota";
import { RepositorioNota } from "src/Note/domain/repositories/RepositorioNota";
import { Optional } from "src/core/ortogonal_solutions/Optional";
import { IdNota } from "src/Note/domain/value_objects/IdNota";

export class EliminarNota implements IServicio<MementoNota>{
    private readonly repositorio:RepositorioNota;

    constructor(r:RepositorioNota){
        this.repositorio = r;
    }

    public async execute(cmd:EliminarNotaComando):Promise<Either<MementoNota, Error>>{
        /*        */
        //MANEJO DE EITHER Y OPTIONAL
        let nota:Nota;
        const v1:Either<Optional<Nota>, Error> = await this.repositorio.buscarNotaPorId(FabricaNota.fabricarIdNota(cmd.id));
        if (v1.isLeft()){
            const v2:Optional<Nota> = v1.getLeft();
            if (v2.HasValue()){
                nota = v2.getValue();
            }
            else {
                //Error de Nota no encontrada
                return Either.makeRight<MementoNota, Error>(new Error());
            }
        }
        else {
            return Either.makeRight<MementoNota, Error>(v1.getRight());
        }
        
        //
        const notaEliminada:MementoNota = nota.guardar();
        console.log(nota);
        const idEliminado:Either<Optional<IdNota>, Error> = await this.repositorio.eliminarNota(FabricaNota.fabricarIdNota(cmd.id));
        
        //MANEJO DE EITHER Y OPTIONAL
        if(idEliminado.isLeft()){
            if (idEliminado.getLeft().HasValue()){
                return Either.makeLeft<MementoNota, Error>(notaEliminada);
            }
            else{
                //Error de Nota no encontrada
                return Either.makeRight<MementoNota, Error>(new Error());
            }
        }
        else {
            return Either.makeRight<MementoNota, Error>(idEliminado.getRight());
        }
        
        
    }
}