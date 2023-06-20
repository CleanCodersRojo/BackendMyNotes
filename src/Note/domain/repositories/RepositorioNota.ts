import { Optional } from 'src/core/ortogonal_solutions/Optional';
import { Either } from 'src/core/ortogonal_solutions/Either';
import { MementoNota } from 'src/Note/domain/MementoNota';
import { IdNota } from '../value_objects/IdNota';
import { ActualizarNotaDTO } from 'src/Note/infraestructure/nota-controler/ActualizarNotaDTO';
import { ActualizarNotaComando } from 'src/Note/application/AcualizarNota/ActualizarNotaComando';

export interface RepositorioNota {
  CrearNota(nota:MementoNota): Promise<Either<Optional<MementoNota>, Error>>;
  BuscarnotasDeusuario(iduser:string): Promise<Either<Optional<MementoNota[]>,Error>>;
  BorrarNota(idnota:string):Promise<Either<Optional<string>,Error>>;
  ActualizarNota(nota:ActualizarNotaComando): Promise<Either<IdNota, Error>>;

}