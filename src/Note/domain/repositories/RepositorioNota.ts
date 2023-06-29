import { Optional } from 'src/Shared/utilities/Optional';
import { Either } from 'src/Shared/utilities/Either';
import { IdNota } from '../value_objects/IdNota';
import { Nota } from '../Nota';
import { NotaSnapshot } from '../NotaSnapshot';
import { IdUser } from 'src/User/domain/value_objects/IdUser';

export interface RepositorioNota {

  buscarNotasPorUsuario(id:IdUser):Promise<Either<Optional<Nota[]>, Error>>
  buscarNotaPorId(id:IdNota):Promise<Either<Optional<Nota>, Error>>;
  
  guardarNota(nota:Nota): Promise<Either<Nota, Error>>;
  eliminarNota(id:IdNota):Promise<Either<Optional<IdNota>, Error>>;
  modificarNota(nota:Nota): Promise<Either<Optional<Nota>, Error>>

}