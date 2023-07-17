import { Either } from "src/Shared/utilities/Either";
import { RepositorioNota } from "src/Note/domain/repositories/RepositorioNota";
import { IServicioQuery } from "src/Shared/application/Shared_Querys/IServicioQuery";
import { CuerpoNotaQuery } from "./CuerpoNotaQuery";
import { FabricaUser } from "src/User/domain/fabrics/fabricaUser";
import { ConvertidorTexto } from "src/Note/infraestructure/repositories_adapter/ConvertidorParteCuerpo/ConvertidorTexto";
import { ConstructorTextoPlanoCuerpo } from "src/Note/domain/fabrics/FabricaTexto/ConstructorTextoPlanoCuerpo";
import { TextoPlanoCuerpo } from "src/Note/domain/value_objects/Cuerpo_VO/TextoPlanoCuerpo";
import { NotaSnapshot } from "src/Note/domain/Snapshot/NotaSnapshot";

export class CuerpoNotaQueryService implements IServicioQuery<NotaSnapshot[]>{
    private readonly repositorio:RepositorioNota;

    constructor(r:RepositorioNota){
        this.repositorio = r;
    }

    public async query(query:CuerpoNotaQuery):Promise<Either<NotaSnapshot[], Error>>{
        const constructor:ConstructorTextoPlanoCuerpo = new ConstructorTextoPlanoCuerpo();

        //CUIDADO! se utiliza downcasting en este caso porque se esta asegurando que lo que se genera es un texto plano por el constructor
        const textosnapshot = constructor.newSnapshot(query.cuerpo);
        const textoRecuperacion = <TextoPlanoCuerpo>constructor.restaurar(textosnapshot);

        const result = await this.repositorio.buscarNotasPorCuerpo(FabricaUser.fabricarIdUser(query.usuarioId),
                                                                    textoRecuperacion);
        let notaSnaphot:NotaSnapshot[] = [];
        if (result.isLeft()){
            if (result.getLeft().HasValue()){
                for (const nota of result.getLeft().getValue()){
                    notaSnaphot.push(nota.getSnapshot());
                }
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