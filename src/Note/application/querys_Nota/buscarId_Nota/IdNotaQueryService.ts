import { Either } from "src/Shared/utilities/Either";
import { Nota } from "src/Note/domain/Nota";
import { FabricaNota } from "src/Note/domain/fabrics/FabricaNota";
import { RepositorioNota } from "src/Note/domain/repositories/RepositorioNota";
import { IServicioQuery } from "src/Shared/application/Shared_Querys/IServicioQuery";
import { IdNotaQuery } from "./IdNotaQuery";
import { FabricaUser } from "src/User/domain/fabrics/fabricaUser";
import { NotaSnapshot } from "src/Note/domain/Snapshot/NotaSnapshot";

export class IdNotaQueryService implements IServicioQuery<NotaSnapshot[]>{
    private readonly repositorio:RepositorioNota;

    constructor(r:RepositorioNota){
        this.repositorio = r;
    }

    public async query(query:IdNotaQuery):Promise<Either<NotaSnapshot[], Error>>{
        const result = await this.repositorio.buscarNotaPorId(FabricaUser.fabricarIdUser(query.usuarioId),
                                                                FabricaNota.fabricarIdNota(query.idNota));
        let notaSnaphot:NotaSnapshot[] = [];
        let nota:Nota;
        if (result.isLeft()){
            if (result.getLeft().HasValue()){
                nota = result.getLeft().getValue();
                notaSnaphot.push(nota.getSnapshot());
                return Either.makeLeft<NotaSnapshot[], Error>(notaSnaphot);
            }
            else {
                return Either.makeRight<NotaSnapshot[], Error>(new Error());
            }   
        }
        else {
            return Either.makeRight<NotaSnapshot[], Error>(result.getRight());
        }
    }
}