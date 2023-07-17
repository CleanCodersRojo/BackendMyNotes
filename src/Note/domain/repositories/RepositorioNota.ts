import { Optional } from 'src/Shared/utilities/Optional';
import { Either } from 'src/Shared/utilities/Either';
import { IdNota } from '../value_objects/IdNota';
import { Nota } from '../Nota';
import { IdUser } from 'src/User/domain/value_objects/IdUser';
import { TituloNota } from '../value_objects/TituloNota';
import { TextoPlanoCuerpo } from '../value_objects/Cuerpo_VO/TextoPlanoCuerpo';
import { IdEtiqueta } from 'src/etiqueta/domain/value_objects/idEtiqueta';
import { FechaNota } from '../value_objects/FechaNota';

export interface RepositorioNota {

  buscarNotasPorUsuario(idUser:IdUser):Promise<Either<Optional<Nota[]>, Error>>
  buscarNotaPorId(idUser:IdUser, id:IdNota):Promise<Either<Optional<Nota>, Error>>;
  buscarNotasPorTitulo(idUser:IdUser, titulo:TituloNota):Promise<Either<Optional<Nota[]>, Error>>;
  buscarNotasPorCuerpo(idUser:IdUser, texto:TextoPlanoCuerpo):Promise<Either<Optional<Nota[]>, Error>>;
  buscarNotasPorEtiqueta(idUser:IdUser, idTag:IdEtiqueta):Promise<Either<Optional<Nota[]>, Error>>;
  buscarNotasPorFechaActualizacion(idUser:IdUser, fecha:FechaNota):Promise<Either<Optional<Nota[]>, Error>>;
  buscarNotasPorFechaCreacion(idUser:IdUser, fecha:FechaNota):Promise<Either<Optional<Nota[]>, Error>>;
  
  guardarNota(nota:Nota): Promise<Either<Nota, Error>>;
  eliminarNota(id:IdNota):Promise<Either<Optional<IdNota>, Error>>;
  modificarNota(nota:Nota): Promise<Either<Optional<Nota>, Error>>

}