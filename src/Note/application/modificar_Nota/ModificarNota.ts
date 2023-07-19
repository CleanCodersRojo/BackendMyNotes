import { Either } from "src/Shared/utilities/Either";
import { IServicio } from "../../../Shared/application/Shared_Commands/IServicio";
import { ModificarNotaComando } from "./ModificarNotaComando";
import { Nota } from "src/Note/domain/Nota";
import { FabricaNota } from "src/Note/domain/fabrics/FabricaNota";
import { NotaSnapshot} from "../../domain/Snapshot/NotaSnapshot";
import { RepositorioNota } from "src/Note/domain/repositories/RepositorioNota";
import { Optional } from "src/Shared/utilities/Optional";
import { FabricaUser } from "src/User/domain/fabrics/fabricaUser";
import { IdNota } from "src/Note/domain/value_objects/IdNota";
import { NotFoundException } from "../_excepciones/NotFoundException";

export class ModificarNota implements IServicio<NotaSnapshot>{
    private readonly repositorio:RepositorioNota;

    constructor(r:RepositorioNota){
        this.repositorio = r;
    }

    public async execute(cmd:ModificarNotaComando):Promise<Either<NotaSnapshot, Error>>{
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

        //Modificar los valores que se quieren modificar en la nota
        nota.setActualizacion(FabricaNota.fabricarFecha(cmd.fechaActualizacion));
        if(cmd.titulo.HasValue()){
            nota.setTitulo(FabricaNota.fabricarTitulo(cmd.titulo.getValue()));
        }
        if(cmd.cuerpo.HasValue()){
            nota.setCuerpo(FabricaNota.fabricarCuerpo(cmd.cuerpo.getValue()));
        }
        if(cmd.fechaEliminacion.HasValue()){
            try {
                nota.eliminar(FabricaNota.fabricarFecha(cmd.fechaEliminacion.getValue()));
            } catch (error) {
                return Either.makeRight<NotaSnapshot, Error>(error);
            }
            
        }
        if(cmd.altitud.HasValue() && cmd.latitud.HasValue()){
            try {
                nota.localizar(FabricaNota.fabricarUbicacion(cmd.latitud.getValue(), cmd.altitud.getValue()));
            } catch (error) {
                return Either.makeRight<NotaSnapshot, Error>(error);
            }
            
        }

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
                return Either.makeRight<NotaSnapshot, Error>(new NotFoundException(idNota));
            }
        }
        else {
            return Either.makeRight<NotaSnapshot, Error>(notaModificada.getRight());
        }
    }
}