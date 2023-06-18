import {Injectable} from '@nestjs/common';
import { Nota } from 'src/Note/domain/Nota';
import {notaModel} from 'src/Note/infraestructure/schemas/nota.schema';
import { Either } from 'src/core/ortogonal_solutions/Either';
import { Optional } from 'src/core/ortogonal_solutions/Optional';
import { RepositorioNota } from 'src/Note/domain/repositories/RepositorioNota';
import { MementoNota } from 'src/Note/domain/MementoNota';
import { IdNota } from 'src/Note/domain/value_objects/IdNota';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MongoNotaAdapter implements RepositorioNota{
    constructor(@InjectModel(Nota.name) private readonly notamodel:notaModel){}

    buscarNotaporId(id: IdNota): Promise<Either<Optional<Nota>, Error>> {
        /*try {
            const notaGuardada = await this.notamodel.find({notaId: id});
            return Promise.resolve(undefined);
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota>, Error>(e));
        }*/
        return Promise.resolve(undefined);
    }

    async createNota(nota:MementoNota): Promise<Either<MementoNota, Error>> {
        //const view:VistaNota = new VistaNota();
        console.log('CreateNotaDTO', nota);
        try {
            //console.log('prueba2', await new this.notamodel(nota));
            const notaGuardada = await (new this.notamodel(nota)).save();
            
            return Either.makeLeft<MementoNota, Error>(nota);
        } catch (e) {
            return Either.makeRight<MementoNota, Error>(e);
        }
    }

    async eliminarNota(id:IdNota):Promise<Either<Optional<IdNota>, Error>>{
        return Promise.resolve(undefined);
    }
    async modificarNota(nota:MementoNota):Promise<Either<Optional<MementoNota>, Error>>{
        return Promise.resolve(undefined);
    }
}