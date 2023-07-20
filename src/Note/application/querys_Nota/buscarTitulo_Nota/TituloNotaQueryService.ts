import { Either } from "src/Shared/utilities/Either";
import { FabricaNota } from "src/Note/domain/fabrics/FabricaNota";
import { RepositorioNota } from "src/Note/domain/repositories/RepositorioNota";
import { IServicioQuery } from "src/Shared/application/Shared_Querys/IServicioQuery";
import { TituloNotaQuery } from "./TituloNotaQuery";
import { FabricaUser } from "src/User/domain/fabrics/fabricaUser";
import { NotaSnapshot } from "src/Note/domain/Snapshot/NotaSnapshot";
import { EmptyListException } from "../../_excepciones/EmptyListException";

export class TituloNotaQueryService implements IServicioQuery<NotaSnapshot[]>{
    private readonly repositorio:RepositorioNota;

    constructor(r:RepositorioNota){
        this.repositorio = r;
    }

    public async query(query:TituloNotaQuery):Promise<Either<NotaSnapshot[], Error>>{
        const result = await this.repositorio.buscarNotasPorTitulo(FabricaUser.fabricarIdUser(query.usuarioId),
                                                                    FabricaNota.fabricarTitulo(query.titulo));
        let notaSnaphot:NotaSnapshot[] = [];
        if (result.isLeft()){
            if (result.getLeft().HasValue()){
                for (const nota of result.getLeft().getValue()){
                    notaSnaphot.push(nota.getSnapshot());
                }
                return Either.makeLeft<NotaSnapshot[], Error>(notaSnaphot);
            }
            else {
                return Either.makeRight<NotaSnapshot[], Error>(new EmptyListException(FabricaUser.fabricarIdUser(query.usuarioId)));
            }   
        }
        else {
            return Either.makeRight<NotaSnapshot[], Error>(result.getRight());
        }
    }
}