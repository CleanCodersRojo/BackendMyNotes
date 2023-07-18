import { Either } from "src/Shared/utilities/Either";
import { RepositorioNota } from "src/Note/domain/repositories/RepositorioNota";
import { IServicioQuery } from "src/Shared/application/Shared_Querys/IServicioQuery";
import { UserNotaQuery } from "./UserNotaQuery";
import { FabricaUser } from "src/User/domain/fabrics/fabricaUser";
import { NotaSnapshot } from "src/Note/domain/Snapshot/NotaSnapshot";
import { CONNREFUSED } from "dns";
import { NotFoundException } from "@nestjs/common";
import { EmptyListException } from "../../excepciones/EmptyListException";

export class UserNotaQueryService implements IServicioQuery<NotaSnapshot[]>{
    private readonly repositorio:RepositorioNota;

    constructor(r:RepositorioNota){
        this.repositorio = r;
    }

    public async query(query:UserNotaQuery):Promise<Either<NotaSnapshot[], Error>>{
        const result = await this.repositorio.buscarNotasPorUsuario(FabricaUser.fabricarIdUser(query.usuarioId));
        
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