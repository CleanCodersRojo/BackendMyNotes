import { Either } from "src/core/ortogonal_solutions/Either";
import { IServicio } from "../../../core/application/core_Comandos/IServicio";
import { ModificarNotaComando } from "./ModificarNotaComando";
import { IGeneradorUUID } from '../../../core/application/core_Comandos/IGeneradorUUID';
import { Nota } from "src/Note/domain/Nota";
import { FabricaNota } from "src/Note/domain/fabrics/FabricaNota";
import { MementoNota} from "../../domain/MementoNota";
import { RepositorioNota } from "src/Note/domain/repositories/RepositorioNota";
import { Optional } from "src/core/ortogonal_solutions/Optional";

export class ModificarNota implements IServicio<MementoNota>{
    private readonly repositorio:RepositorioNota;

    constructor(r:RepositorioNota){
        this.repositorio = r;
    }

    public async execute(cmd:ModificarNotaComando):Promise<Either<MementoNota, Error>>{
        /*
            buscar nota
            comparar valores cambiables y crear una nueva.
        */
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
        const notaAModificar:MementoNota = nota.guardar();
        
        //
        notaAModificar.fechaActualizacion = cmd.fechaActualizacion;
        if(cmd.titulo.HasValue()){
            notaAModificar.titulo = cmd.titulo.getValue();
        }
        if (cmd.cuerpo.HasValue()){
            notaAModificar.cuerpo = cmd.cuerpo.getValue();
        }
        if (cmd.fechaEliminacion.HasValue()){
            notaAModificar.fechaEliminacion = cmd.fechaEliminacion.getValue();
        }
        if (cmd.altitud.HasValue() && cmd.latitud.HasValue()){
            notaAModificar.altitud = cmd.altitud.getValue();
            notaAModificar.latitud = cmd.latitud.getValue();
        }
        const notaModificada:Either<Optional<MementoNota>, Error> = await this.repositorio.modificarNota(notaAModificar);
        console.log(notaModificada);
        
        //MANEJO DE EITHER Y OPTIONAL
        if(notaModificada.isLeft()){
            if (notaModificada.getLeft().HasValue()){
                return Either.makeLeft<MementoNota, Error>(notaAModificar);
            }
            else{
                //Error de Nota no encontrada
                return Either.makeRight<MementoNota, Error>(new Error());
            }
        }
        else {
            return Either.makeRight<MementoNota, Error>(notaModificada.getRight());
        }
    }
}