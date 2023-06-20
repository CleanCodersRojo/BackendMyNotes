import { Either } from "src/core/ortogonal_solutions/Either";
import { IServicio } from "../../../core/application/core_Comandos/IServicio";
import { ActualizarNotaComando } from "./ActualizarNotaComando";
import { IGeneradorUUID } from '../../../core/application/core_Comandos/IGeneradorUUID';
import { Nota } from "src/Note/domain/Nota";
import { FabricaNota } from "src/Note/domain/fabrics/FabricaNota";
import { MementoNota} from "../../domain/MementoNota";
import { RepositorioNota } from "src/Note/domain/repositories/RepositorioNota";
import { Optional } from "src/core/ortogonal_solutions/Optional";
import { IdNota } from "src/Note/domain/value_objects/IdNota";

export class ActualizarNota implements IServicio<IdNota>{
    private readonly repositorio:RepositorioNota;

    constructor(r:RepositorioNota){
        this.repositorio = r;
    }

    public async execute(cmd:ActualizarNotaComando):Promise<Either<IdNota, Error>>{
      
            const idnotaactualizada:Either<IdNota, Error> = await this.repositorio.ActualizarNota(cmd);
            return idnotaactualizada;
    }
}