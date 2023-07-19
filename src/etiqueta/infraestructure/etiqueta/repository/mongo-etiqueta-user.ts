/* import { Either } from "src/Shared/utilities/Either";
import { Optional } from "src/Shared/utilities/Optional";
import { Etiqueta } from "src/etiqueta/domain/etiqueta";
import { RepositorioEtiqueta } from "src/etiqueta/domain/repository/etiquetaRepository";
import { IdEtiqueta } from "src/etiqueta/domain/value_objects/idEtiqueta";
import { etiquetaModel } from "../../schemas/etiquetaModel";
import { InjectModel } from "@nestjs/mongoose";
import { FabricaEtiqueta } from "src/etiqueta/domain/fabrics/fabricaEtiqueta";
import { EtiquetaSnapshot } from "src/etiqueta/domain/Snapshots/EtiquetaSnapShot";

export class MongoEtiquetaRepository implements RepositorioEtiqueta {

    constructor(@InjectModel(Etiqueta.nombre) private readonly etiquetamodel:etiquetaModel){}
   async  buscarEtiquetaPorId(id: IdEtiqueta): Promise<Either<Optional<EtiquetaSnapshot >, Error>> {
        try{
            const data = await this.etiquetamodel.find({id:id})

            for (const etiquetajson of data){
                let  etiqueta:Etiqueta =FabricaEtiqueta.fabricar(etiquetajson.Id, etiquetajson.nombre,);
                const vistaEtiqueta:EtiquetaSnapshot = etiqueta.guardar();
            }
           
            return Promise.resolve(Either.makeLeft<Optional<EtiquetaSnapshot >,Error>(new Optional<EtiquetaSnapshot >(vistaEtiqueta)));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<EtiquetaSnapshot >, Error>(e))
        }
    }
    guardarEtiqueta(etiqueta: Etiqueta): Promise<Either<Etiqueta, Error>> {
        throw new Error("Method not implemented.");
    }
    eliminarEtiqueta(id: IdEtiqueta): Promise<Either<Optional<IdEtiqueta>, Error>> {
        throw new Error("Method not implemented.");
    }
    modificarEtiqueta(etiqueta: Etiqueta): Promise<Either<Optional<Etiqueta>, Error>> {
        throw new Error("Method not implemented.");
    }
    
}
     */