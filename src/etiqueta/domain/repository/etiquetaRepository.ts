import { Optional } from 'src/Shared/utilities/Optional';
import { Either } from 'src/Shared/utilities/Either';

import { IdUser } from 'src/User/domain/value_objects/IdUser';
import { IdEtiqueta } from '../value_objects/idEtiqueta';
import { Etiqueta } from '../etiqueta';
import { EtiquetaSnapshot } from '../Snapshots/EtiquetaSnapShot';

export interface RepositorioEtiqueta {

 // buscarEtiquetaPorUsuario(id:IdUser):Promise<Either<Optional<Etiqueta[]>, Error>>
  buscarEtiquetaPorId(id:IdEtiqueta):Promise<Either<Optional<EtiquetaSnapshot >, Error>>;
  
  guardarEtiqueta(etiqueta:Etiqueta): Promise<Either<Etiqueta, Error>>;
  eliminarEtiqueta(id:IdEtiqueta):Promise<Either<Optional<IdEtiqueta>, Error>>;
  modificarEtiqueta(etiqueta:Etiqueta): Promise<Either<Optional<Etiqueta>, Error>>

}