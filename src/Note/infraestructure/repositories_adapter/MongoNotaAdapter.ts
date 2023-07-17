import {Injectable} from '@nestjs/common';
import { Nota } from 'src/Note/domain/Nota';
import {NotaSchema, notaModel} from 'src/Note/infraestructure/schemas/nota.schema';
import { Either } from 'src/Shared/utilities/Either';
import { Optional } from 'src/Shared/utilities/Optional';
import { NotaSnapshot } from 'src/Note/domain/Snapshot/NotaSnapshot';
import { IdNota } from 'src/Note/domain/value_objects/IdNota';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { ConvertidorNota } from './ConvertidorNota';
import { IdUser } from 'src/User/domain/value_objects/IdUser';
import { ParteCuerpoSnapshot } from 'src/Note/domain/Snapshot/ParteCuerpoSnapshot';
import { FabricaRestaurarNota } from 'src/Note/domain/fabrics/FabricaRestaurarNota';
import { TituloNota } from 'src/Note/domain/value_objects/TituloNota';
import { TextoPlanoCuerpo } from 'src/Note/domain/value_objects/Cuerpo_VO/TextoPlanoCuerpo';
import { IdEtiqueta } from 'src/etiqueta/domain/value_objects/idEtiqueta';
import { RepositorioNota } from 'src/Note/domain/repositories/RepositorioNota';
import { FechaNota } from 'src/Note/domain/value_objects/FechaNota';

@Injectable()
export class MongoNotaAdapter implements RepositorioNota{
    constructor(@InjectModel(Nota.name) private readonly notamodel:notaModel){}

    async buscarNotasPorUsuario(id:IdUser):Promise<Either<Optional<Nota[]>, Error>>{
        try {
            const data = await this.notamodel.find({usuarioId:id.getId()}).sort({fechaActualizacion:-1});
            const notas: Nota[]= [];
            
            for (const notajson of data){
                const snapshot:NotaSnapshot = ConvertidorNota.convertirASnapshot(notajson);
                const nota:Nota = FabricaRestaurarNota.restaurarNota(snapshot);
                notas.push(nota);
            }
            if(!(notas.length === 0))
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>(notas)));
            else
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>()));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota[]>, Error>(e))
        }
    }
    
    async buscarNotaPorId(idUser:IdUser, id: IdNota): Promise<Either<Optional<Nota>, Error>> {
        try {
            //const notaBuscada = await this.notamodel.findOne({notaId: id.getId()});
            const notaBuscada = await this.notamodel.findOne({$and:[{usuarioId: idUser.getId()},{notaId: id.getId()}]}).sort({fechaActualizacion:-1});

            const snapshot:NotaSnapshot = ConvertidorNota.convertirASnapshot(notaBuscada);
            const nota:Nota = FabricaRestaurarNota.restaurarNota(snapshot);

            return Promise.resolve(Either.makeLeft<Optional<Nota>, Error>(new Optional<Nota>(nota)));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota>, Error>(e));
        }
    }

    async buscarNotasPorTitulo(idUser:IdUser, titulo:TituloNota):Promise<Either<Optional<Nota[]>, Error>>{
        try {
            const data = await this.notamodel.find({$and:[{usuarioId: idUser.getId()},{titulo: {$regex: titulo.getTitulo()}}]}).sort({fechaActualizacion:-1});
            const notas: Nota[]= [];
            
            for (const notajson of data){
                const snapshot:NotaSnapshot = ConvertidorNota.convertirASnapshot(notajson);
                const nota:Nota = FabricaRestaurarNota.restaurarNota(snapshot);
                notas.push(nota);
            }
            if(!(notas.length === 0))
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>(notas)));
            else
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>()));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota[]>, Error>(e))
        }
    }

    async buscarNotasPorCuerpo(idUser:IdUser, texto:TextoPlanoCuerpo):Promise<Either<Optional<Nota[]>, Error>>{
        try {
            const text = texto.getParteSnapshot();

            const data = await this.notamodel.find({$and:[{usuarioId: idUser.getId()},
                                                    {"cuerpo.tipo":"Texto Plano"}, {"cuerpo.texto": {$regex: text.texto}}]}).sort({fechaActualizacion:-1});;
            const notas: Nota[]= [];
            console.log(data);
            for (const notajson of data){
                const snapshot:NotaSnapshot = ConvertidorNota.convertirASnapshot(notajson);
                const nota:Nota = FabricaRestaurarNota.restaurarNota(snapshot);
                notas.push(nota);
            }
            if(!(notas.length === 0))
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>(notas)));
            else
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>()));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota[]>, Error>(e))
        }
    }
    
    async buscarNotasPorEtiqueta(idUser:IdUser, idTag:IdEtiqueta):Promise<Either<Optional<Nota[]>, Error>>{
        return Promise.resolve(undefined);
    }

    async buscarNotasPorFechaActualizacion(idUser:IdUser, fecha:FechaNota):Promise<Either<Optional<Nota[]>, Error>>{
        try {
            const data = await this.notamodel.find({$and:[{usuarioId: idUser.getId()},{fechaActualizacion:fecha.getFecha()}]}).sort({fechaActualizacion:-1});;
            const notas: Nota[]= [];
            console.log(data);
            for (const notajson of data){
                const snapshot:NotaSnapshot = ConvertidorNota.convertirASnapshot(notajson);
                const nota:Nota = FabricaRestaurarNota.restaurarNota(snapshot);
                notas.push(nota);
            }
            if(!(notas.length === 0))
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>(notas)));
            else
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>()));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota[]>, Error>(e))
        }
    }

    async buscarNotasPorFechaCreacion(idUser:IdUser, fecha:FechaNota):Promise<Either<Optional<Nota[]>, Error>>{
        try {
            const data = await this.notamodel.find({$and:[{usuarioId: idUser.getId()},{fechaCreacion:fecha.getFecha()}]}).sort({fechaActualizacion:-1});;
            const notas: Nota[]= [];
            console.log(data);
            for (const notajson of data){
                const snapshot:NotaSnapshot = ConvertidorNota.convertirASnapshot(notajson);
                const nota:Nota = FabricaRestaurarNota.restaurarNota(snapshot);
                notas.push(nota);
            }
            if(!(notas.length === 0))
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>(notas)));
            else
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>()));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota[]>, Error>(e))
        }
    }

    //========================================================================================================//
    //========================================================================================================//
    //========================================================================================================//


    //GuardarNota en la Base de Datos
    async guardarNota(nota:Nota): Promise<Either<Nota, Error>> {
        console.log('CreateNotaDTO', nota);
        console.log("=========================");
        console.log('nota', nota.getSnapshot().cuerpo);

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
        const cuerpo:Array<ParteCuerpoSnapshot> = snapshot.cuerpo;
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