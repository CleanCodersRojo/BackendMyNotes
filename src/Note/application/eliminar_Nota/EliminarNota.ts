import { Either } from "../../../Shared/utilities/Either";
import { IServicio } from "../../../Shared/application/Shared_Commands/IServicio";
import { EliminarNotaComando } from "./EliminarNotaComando";
import { Nota } from "../../domain/Nota";
import { FabricaNota } from "../../domain/fabrics/FabricaNota";
import { NotaSnapshot} from "../../domain/Snapshot/NotaSnapshot";
import { RepositorioNota } from "../../domain/repositories/RepositorioNota";
import { Optional } from "../../../Shared/utilities/Optional";
import { IdNota } from "../../domain/value_objects/IdNota";
import { FabricaUser } from "../../../User/domain/fabrics/fabricaUser";
import { NotFoundException } from "../_excepciones/NotFoundException";
import { DeleteNotValidNoteException } from "../_excepciones/DeleteNotValidNoteException";

export class EliminarNota implements IServicio<NotaSnapshot>{
    private readonly repositorio:RepositorioNota;

    constructor(r:RepositorioNota){
        this.repositorio = r;
    }

    public async execute(cmd:EliminarNotaComando):Promise<Either<NotaSnapshot, Error>>{
        //Buscar la nota primero de la base de datos
        let nota:Nota;
        let notaEliminada:NotaSnapshot
        const idNota:IdNota = FabricaNota.fabricarIdNota(cmd.id);
        let errorWait:Optional<Either<NotaSnapshot, Error>> = new Optional<Either<NotaSnapshot, Error>>();


        const v1:Either<Optional<Nota>, Error> = await this.repositorio.buscarNotaPorId(FabricaUser.fabricarIdUser(cmd.usuarioId)
                                                                                        ,idNota);
        
        //MANEJO DE EITHER Y OPTIONAL
        if (v1.isLeft()){
            const v2:Optional<Nota> = v1.getLeft();
            if (v2.HasValue()){
                nota = v2.getValue();
                //Snapshot de retorno de la nota a eliminar
                notaEliminada = nota.getSnapshot();
            }
            else {
                //Error de Nota no encontrada
                return Either.makeRight<NotaSnapshot, Error>(new NotFoundException(idNota));
            }
        }
        else {
            errorWait = new Optional<Either<NotaSnapshot, Error>>(   Either.makeRight<NotaSnapshot, Error>(v1.getRight())   );
        }
        
        //Eliminar Nota de la base de datos
        const idEliminado:Either<Optional<IdNota>, Error> = await this.repositorio.eliminarNota(idNota);
        
        //MANEJO DE EITHER Y OPTIONAL
        if(idEliminado.isLeft()){
            if (idEliminado.getLeft().HasValue()){
                if (errorWait.HasValue()){
                    return Either.makeRight<NotaSnapshot, Error>(new DeleteNotValidNoteException(idEliminado.getLeft().getValue()));
                }else{
                    return Either.makeLeft<NotaSnapshot, Error>(notaEliminada);
                }
            }
            else{
                //Error de Nota no encontrada
                return Either.makeRight<NotaSnapshot, Error>(new Error());
            }
        }
        else {
            if (errorWait.HasValue()){
                return errorWait.getValue();
            }
            return Either.makeRight<NotaSnapshot, Error>(idEliminado.getRight());
        }
    }
}