import {Inject, Injectable} from '@nestjs/common';
import { Model } from 'mongoose';
import { Nota } from 'src/Note/domain/Nota';
import {NotaSchema} from 'src/Note/infraestructure/schemas/nota.schema';
import { Either } from 'src/core/ortogonal_solutions/Either';
import { Optional } from 'src/core/ortogonal_solutions/Optional';
import { RepositorioNota } from 'src/Note/domain/repositories/RepositorioNota';
import { MementoNota } from 'src/Note/domain/MementoNota';
import { IdNota } from 'src/Note/domain/value_objects/IdNota';
import { ActualizarNotaComando } from 'src/Note/application/AcualizarNota/ActualizarNotaComando';

@Injectable()
export class MongoNotaAdapter implements RepositorioNota{
    constructor(@Inject("RepositorioNota") private readonly NotaRepository ){

    }
    async CrearNota(nota:MementoNota): Promise<Either<Optional<MementoNota>, Error>>{
        return await this.NotaRepository.CrearNota(nota);
    }

    async BuscarnotasDeusuario(iduser: string): Promise<Either<Optional<MementoNota[]>, Error>> {
        return await this.NotaRepository.BuscarnotasDeusuario(iduser);
    }

    async BorrarNota(idnota: string): Promise<Either<Optional<string>, Error>> {
        return await this.NotaRepository.BorrarNota(idnota);
    }

    async ActualizarNota(nota:ActualizarNotaComando): Promise<Either<IdNota, Error>> {
        return await this.NotaRepository.ActualizarNota(nota);
    }


}