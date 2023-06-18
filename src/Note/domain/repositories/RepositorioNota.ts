import { Optional } from 'src/core/ortogonal_solutions/Optional';
import { Either } from 'src/core/ortogonal_solutions/Either';
import { MementoNota } from 'src/Note/domain/MementoNota';
import { IdNota } from '../value_objects/IdNota';
import { Nota } from '../Nota';

export interface RepositorioNota {
  buscarNotaporId(id:IdNota):Promise<Either<Optional<Nota>, Error>>;
  
  createNota(nota:MementoNota): Promise<Either<MementoNota, Error>>;
  eliminarNota(id:IdNota):Promise<Either<Optional<IdNota>, Error>>;
  modificarNota(nota:MementoNota):Promise<Either<Optional<MementoNota>, Error>>;

}