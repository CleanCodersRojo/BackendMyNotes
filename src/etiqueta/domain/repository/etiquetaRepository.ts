import { Optional } from 'src/Shared/utilities/Optional';
import { Either } from 'src/Shared/utilities/Either';

import { IdUser } from 'src/User/domain/value_objects/IdUser';
import { IdEtiqueta } from '../value_objects/idEtiqueta';
import { Etiqueta } from '../etiqueta';

export interface RepositorioEtiqueta {

 // buscarEtiquetaPorUsuario(id:IdUser):Promise<Either<Optional<Etiqueta[]>, Error>>
  buscarEtiquetaPorId(id:IdEtiqueta):Promise<Either<Optional<Etiqueta>, Error>>;
  
  guardarNota(etiqueta:Etiqueta): Promise<Either<Etiqueta, Error>>;
  eliminarNota(id:IdEtiqueta):Promise<Either<Optional<IdEtiqueta>, Error>>;
  modificarNota(etiqueta:Etiqueta): Promise<Either<Optional<Etiqueta>, Error>>

}