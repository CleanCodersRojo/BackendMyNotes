import {Injectable} from '@nestjs/common';
import { Nota } from 'src/Note/domain/Nota';
import {NotaSchema, notaModel} from 'src/Note/infraestructure/schemas/nota.schema';
import { Either } from 'src/Shared/utilities/Either';
import { Optional } from 'src/Shared/utilities/Optional';
import { RepositorioNota } from 'src/Note/domain/repositories/RepositorioNota';
import { NotaSnapshot } from 'src/Note/domain/NotaSnapshot';
import { IdNota } from 'src/Note/domain/value_objects/IdNota';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { FabricaNota } from 'src/Note/domain/fabrics/FabricaNota';
import { UbicacionNota } from '../../domain/value_objects/UbicacionNota';
import { ConvertidorNota } from './ConvertidorNota';
import { IdUser } from 'src/User/domain/value_objects/IdUser';

@Injectable()
export class MongoNotaAdapter implements RepositorioNota{
    constructor(@InjectModel(Nota.name) private readonly notamodel:notaModel){}

    async buscarNotasPorUsuario(id:IdUser):Promise<Either<Optional<Nota[]>, Error>>{
        try {
            const data = await this.notamodel.find({usuarioId:id.getId()})
            const Notas: Nota[]= [];

            for (const notajson of data){
                const snapshot:NotaSnapshot = ConvertidorNota.convertirASnapshot(notajson);
                const nota:Nota = FabricaNota.restaurarNota(snapshot);
                Notas.push(nota);   
            }
            console.log(Notas);

            return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>(Notas)));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota[]>, Error>(e))
        }
    }
    
    async buscarNotaPorId(id: IdNota): Promise<Either<Optional<Nota>, Error>> {
        try {
            const notaBuscada = await this.notamodel.findOne({notaId: id.getId()});

            const snapshot:NotaSnapshot = ConvertidorNota.convertirASnapshot(notaBuscada);
            const nota:Nota = FabricaNota.restaurarNota(snapshot);

            return Promise.resolve(Either.makeLeft<Optional<Nota>, Error>(new Optional<Nota>(nota)));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota>, Error>(e));
        }
    }

    //GuardarNota en la Base de Datos
    async guardarNota(nota:Nota): Promise<Either<Nota, Error>> {
        console.log('CreateNotaDTO', nota);

        const snapshot:NotaSnapshot = nota.getSnapshot();
        try {
            const notaGuardada = await (new this.notamodel(snapshot)).save();
            return Either.makeLeft<Nota, Error>(nota);
        } catch (e) {
            return Either.makeRight<Nota, Error>(e);
        }
    }

    async eliminarNota(id:IdNota):Promise<Either<Optional<IdNota>, Error>>{
        try {
            const notaGuardada = await this.notamodel.deleteOne(/*{$and:[*/{notaId: id.getId()}/*,{}]}*/);
            return Promise.resolve(Either.makeLeft<Optional<IdNota>, Error>( new Optional<IdNota>(id)));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<IdNota>, Error>(e));
        }
    }
    
    async modificarNota(nota:Nota): Promise<Either<Optional<Nota>, Error>> {
        const snapshot:NotaSnapshot = nota.getSnapshot(); 
        const titulo:string = snapshot.titulo;
        const cuerpo:string = snapshot.cuerpo;
        const fechaEliminacion:Optional<Date> = snapshot.fechaEliminacion;
        const fechaActualizacion:Date = snapshot.fechaActualizacion;
        const latitud:Optional<number> = snapshot.latitud;
        const altitud:Optional<number> = snapshot.altitud;
        try {
            const updatedNota = await this.notamodel.findOneAndUpdate(
                {notaId: snapshot.notaId},
                {titulo,cuerpo,fechaEliminacion,fechaActualizacion, latitud, altitud},
                { new: true },
            )

            console.log(updatedNota);
            return Promise.resolve(Either.makeLeft<Optional<Nota>, Error>(new Optional<Nota>(nota)));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota>, Error>(e));
        } 
    }
}