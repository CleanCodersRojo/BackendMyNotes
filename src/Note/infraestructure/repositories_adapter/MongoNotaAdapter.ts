import {Injectable} from '@nestjs/common';
import { Nota } from 'src/Note/domain/Nota';
import {notaModel} from 'src/Note/infraestructure/schemas/nota.schema';
import { Either } from 'src/core/ortogonal_solutions/Either';
import { Optional } from 'src/core/ortogonal_solutions/Optional';
import { RepositorioNota } from 'src/Note/domain/repositories/RepositorioNota';
import { MementoNota } from 'src/Note/domain/MementoNota';
import { IdNota } from 'src/Note/domain/value_objects/IdNota';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { FabricaNota } from 'src/Note/domain/fabrics/FabricaNota';

@Injectable()
export class MongoNotaAdapter implements RepositorioNota{
    constructor(@InjectModel(Nota.name) private readonly notamodel:notaModel){}

    async buscarNotasPorUsuario(id:string):Promise<Either<Optional<MementoNota[]>, Error>>{
        try {
            const data = await this.notamodel.find({usuarioId:id})
            const NotasMemento: MementoNota[]= [];

            for (const notajson of data){
                let nota:Nota = FabricaNota.fabricar(notajson.notaId, notajson.titulo,notajson.cuerpo,notajson.fechaCreacion,new Optional<Date>(notajson.fechaEliminacion),notajson.fechaActualizacion,
                notajson.latitud,notajson.altitud, notajson.usuarioId);

                const vistaNota:MementoNota = nota.guardar();
                NotasMemento.push(vistaNota);
                
            }
            console.log(NotasMemento);

            return Promise.resolve(Either.makeLeft<Optional<MementoNota[]>,Error>(new Optional<MementoNota[]>(NotasMemento)));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<MementoNota[]>, Error>(e))
        }
    }
    
    async buscarNotaPorId(id: IdNota): Promise<Either<Optional<Nota>, Error>> {
        try {
            const notaBuscada = await this.notamodel.find({notaId: id.getId()});
            const nota:Nota = FabricaNota.fabricar(notaBuscada[0].notaId, notaBuscada[0].titulo,notaBuscada[0].cuerpo,
                                                    notaBuscada[0].fechaCreacion,new Optional<Date>(notaBuscada[0].fechaEliminacion),
                                                    notaBuscada[0].fechaActualizacion, notaBuscada[0].latitud,
                                                    notaBuscada[0].altitud, notaBuscada[0].usuarioId);

            return Promise.resolve(Either.makeLeft<Optional<Nota>, Error>(new Optional<Nota>(nota)));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota>, Error>(e));
        }
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
        try {
            const notaGuardada = await this.notamodel.deleteOne(/*{$and:[*/{notaId: id.getId()}/*,{}]}*/);
            return Promise.resolve(Either.makeLeft<Optional<IdNota>, Error>( new Optional<IdNota>(id)));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<IdNota>, Error>(e));
        }
    }
    
    async modificarNota(nota:MementoNota): Promise<Either<Optional<MementoNota>, Error>> {
        const titulo:string = nota.titulo;
        const cuerpo:string = nota.cuerpo;
        const fechaEliminacion:Date = nota.fechaEliminacion;
        const fechaActualizacion:Date = nota.fechaActualizacion;
        try {
            const updatedNota = await this.notamodel.findOneAndUpdate(
                {notaId: nota.notaId},
                {titulo,cuerpo,fechaEliminacion,fechaActualizacion},
                { new: true },
            )
            return Promise.resolve(Either.makeLeft<Optional<MementoNota>, Error>(new Optional<MementoNota>(nota)));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<MementoNota>, Error>(e));
        } 
    }
}