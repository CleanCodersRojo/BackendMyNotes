import { Either } from "src/Shared/utilities/Either";
import { IServicio } from "../../../Shared/application/Shared_Commands/IServicio";
import { ModificarNotaComando } from "./ModificarNotaComando";
import { Nota } from "src/Note/domain/Nota";
import { FabricaNota } from "src/Note/domain/fabrics/FabricaNota";
import { NotaSnapshot} from "../../domain/Snapshot/NotaSnapshot";
import { RepositorioNota } from "src/Note/domain/repositories/RepositorioNota";
import { Optional } from "src/Shared/utilities/Optional";
import { TituloNota } from "src/Note/domain/value_objects/TituloNota";
import { FechaNota } from "src/Note/domain/value_objects/FechaNota";
import { UbicacionNota } from "src/Note/domain/value_objects/UbicacionNota";
import { FabricaUser } from "src/User/domain/fabrics/fabricaUser";

export class ModificarNota implements IServicio<NotaSnapshot>{
    private readonly repositorio:RepositorioNota;

    constructor(r:RepositorioNota){
        this.repositorio = r;
    }

    public async execute(cmd:ModificarNotaComando):Promise<Either<NotaSnapshot, Error>>{
        //Buscar la nota primero de la base de datos
        let nota:Nota;
        const v1:Either<Optional<Nota>, Error> = await this.repositorio.buscarNotaPorId(FabricaUser.fabricarIdUser(cmd.usuarioId)
                                                                                        ,FabricaNota.fabricarIdNota(cmd.id));


        //MANEJO DE EITHER Y OPTIONAL
        if (v1.isLeft()){
            const v2:Optional<Nota> = v1.getLeft();
            if (v2.HasValue()){
                nota = v2.getValue();
            }
            else {
                //Error de Nota no encontrada
                return Either.makeRight<NotaSnapshot, Error>(new Error());
            }
        }
        else {
            return Either.makeRight<NotaSnapshot, Error>(v1.getRight());
        }

        //Modificar los valores que se quieren modificar en la nota
        if(cmd.titulo.HasValue()){
            nota.setTitulo(FabricaNota.fabricarTitulo(cmd.titulo.getValue()));
        }
        if(cmd.cuerpo.HasValue()){
            nota.setCuerpo(FabricaNota.fabricarCuerpo(cmd.cuerpo.getValue()));
        }
        if(cmd.fechaEliminacion.HasValue()){
            nota.eliminar(FabricaNota.fabricarFecha(cmd.fechaEliminacion.getValue()));
        }
        if(cmd.altitud.HasValue() && cmd.latitud.HasValue()){
            nota.localizar(FabricaNota.fabricarUbicacion(cmd.latitud.getValue(), cmd.altitud.getValue()));
        }
        
        console.log("NOTA V2", nota);
        console.log("=======================");

        //enviar la nota para que sea modificada
        const notaModificada:Either<Optional<Nota>, Error> = await this.repositorio.modificarNota(nota);
        //Snapshot de la nota modificada
        const notaAModificar:NotaSnapshot = nota.getSnapshot();
        //console.log(notaModificada);
        
        //MANEJO DE EITHER Y OPTIONAL
        if(notaModificada.isLeft()){
            if (notaModificada.getLeft().HasValue()){
                return Either.makeLeft<NotaSnapshot, Error>(notaAModificar);
            }
            else{
                //Error de Nota no encontrada
                return Either.makeRight<NotaSnapshot, Error>(new Error());
            }
        }
        else {
            return Either.makeRight<NotaSnapshot, Error>(notaModificada.getRight());
        }
    }
}