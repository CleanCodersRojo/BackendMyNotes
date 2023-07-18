import { Either } from "src/Shared/utilities/Either";
import { IServicio } from "../../../Shared/application/Shared_Commands/IServicio";
import { EliminarNotaComando } from "./EliminarNotaComando";
import { Nota } from "src/Note/domain/Nota";
import { FabricaNota } from "src/Note/domain/fabrics/FabricaNota";
import { NotaSnapshot} from "../../domain/Snapshot/NotaSnapshot";
import { RepositorioNota } from "src/Note/domain/repositories/RepositorioNota";
import { Optional } from "src/Shared/utilities/Optional";
import { IdNota } from "src/Note/domain/value_objects/IdNota";
import { FabricaUser } from "src/User/domain/fabrics/fabricaUser";
import { NotFoundException } from "../excepciones/NotFoundException";

export class EliminarNota implements IServicio<NotaSnapshot>{
    private readonly repositorio:RepositorioNota;

    constructor(r:RepositorioNota){
        this.repositorio = r;
    }

    public async execute(cmd:EliminarNotaComando):Promise<Either<NotaSnapshot, Error>>{
        //Buscar la nota primero de la base de datos
        let nota:Nota;
        const idNota:IdNota = FabricaNota.fabricarIdNota(cmd.id);
        const v1:Either<Optional<Nota>, Error> = await this.repositorio.buscarNotaPorId(FabricaUser.fabricarIdUser(cmd.usuarioId)
                                                                                        ,idNota);
        
        //MANEJO DE EITHER Y OPTIONAL
        if (v1.isLeft()){
            const v2:Optional<Nota> = v1.getLeft();
            if (v2.HasValue()){
                nota = v2.getValue();
            }
            else {
                //Error de Nota no encontrada
                return Either.makeRight<NotaSnapshot, Error>(new NotFoundException(idNota));
            }
        }
        else {
            return Either.makeRight<NotaSnapshot, Error>(v1.getRight());
        }
        
        //Snapshot de retorno de la nota a eliminar
        const notaEliminada:NotaSnapshot = nota.getSnapshot();

        //Eliminar Nota de la base de datos
        const idEliminado:Either<Optional<IdNota>, Error> = await this.repositorio.eliminarNota(idNota);
        
        //MANEJO DE EITHER Y OPTIONAL
        if(idEliminado.isLeft()){
            if (idEliminado.getLeft().HasValue()){
                return Either.makeLeft<NotaSnapshot, Error>(notaEliminada);
            }
            else{
                //Error de Nota no encontrada
                return Either.makeRight<NotaSnapshot, Error>(new Error());
            }
        }
        else {
            return Either.makeRight<NotaSnapshot, Error>(idEliminado.getRight());
        }
    }
}