import { Either } from "src/Shared/utilities/Either";
import { IServicio } from "../../../Shared/application/Shared_Commands/IServicio";
import { CrearNotaComando } from "./CrearNotaComando";
import { IGeneradorUUID } from '../../../Shared/application/Shared_Commands/IGeneradorUUID';
import { Nota } from "src/Note/domain/Nota";
import { FabricaNota } from "src/Note/domain/fabrics/FabricaNota";
import { NotaSnapshot} from "../../domain/Snapshot/NotaSnapshot";
import { RepositorioNota } from "src/Note/domain/repositories/RepositorioNota";

export class CrearNota implements IServicio<NotaSnapshot>{
    private readonly generadorUUID:IGeneradorUUID;
    private readonly repositorio:RepositorioNota;

    constructor(g:IGeneradorUUID, r:RepositorioNota){
        this.generadorUUID = g;
        this.repositorio = r;
    }

    public async execute(cmd:CrearNotaComando):Promise<Either<NotaSnapshot, Error>>{
        //Generar ID de la nota mediante un adaptador
        let notaId:string = this.generadorUUID.generate();

        //Fabrica de Nota a partir de un comando****
        let nota:Nota = FabricaNota.fabricar(notaId, cmd.titulo, cmd.cuerpo, cmd.fechaCreacion, cmd.fechaEliminacion,
                                            cmd.fechaActualizacion, cmd.latitud, cmd.altitud, cmd.usuarioId);

        //Guardar la nueva Nota en la BD
        const nuevaNota:Either<Nota, Error> = await this.repositorio.guardarNota(nota);

        //Retornar el resultado
        if (nuevaNota.isLeft()){
            return Either.makeLeft<NotaSnapshot, Error>(nota.getSnapshot());
        }
        else {
            return Either.makeRight<NotaSnapshot, Error>(nuevaNota.getRight());
        }
    }
}