import {Injectable} from '@nestjs/common';
import { Nota } from 'src/Note/domain/Nota';
import {notaModel} from 'src/Note/infraestructure/schemas/nota.schema';
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
import { DataBaseException } from '../excepciones/DataBaseException';

@Injectable()
export class MongoNotaAdapter implements RepositorioNota{
    constructor(@InjectModel(Nota.name) private readonly notamodel:notaModel){}

    private transformList(data:any):Nota[]{
        const notas: Nota[]= [];

        for (const notajson of data){
            const snapshot:Either<NotaSnapshot,Error> = ConvertidorNota.convertirASnapshot(notajson);
            
            if(snapshot.isLeft()){
                const nota:Nota = FabricaRestaurarNota.restaurarNota(snapshot.getLeft());
                notas.push(nota);
            }
        }

        return notas;
    }

    async buscarNotasPorUsuario(id:IdUser):Promise<Either<Optional<Nota[]>, Error>>{
        try {
            const data = await this.notamodel.find({usuarioId:id.getId()}).sort({fechaActualizacion:-1});
            const notas:Nota[] = this.transformList(data);

            if(!(notas.length === 0))
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>(notas)));
            else
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>()));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota[]>, Error>(new DataBaseException(e)))
        }
    }
    
    async buscarNotaPorId(idUser:IdUser, id: IdNota): Promise<Either<Optional<Nota>, Error>> {
        try {
            //const notaBuscada = await this.notamodel.findOne({notaId: id.getId()});
            const notaBuscada = await this.notamodel.findOne({$and:[{usuarioId: idUser.getId()},{notaId: id.getId()}]}).sort({fechaActualizacion:-1});
            const result:Optional<any> = new Optional<any>(notaBuscada);
            if(result.HasValue()){
                const snapshot:Either<NotaSnapshot,Error> = ConvertidorNota.convertirASnapshot(result.getValue());     

                if(snapshot.isLeft()){
                    const nota:Nota = FabricaRestaurarNota.restaurarNota(snapshot.getLeft());
                    return Promise.resolve(Either.makeLeft<Optional<Nota>, Error>(new Optional<Nota>(nota)));
                } else{
                    return Promise.resolve(Either.makeRight<Optional<Nota>, Error>(snapshot.getRight()))
                }
            } else {
                return Promise.resolve(Either.makeLeft<Optional<Nota>, Error>(new Optional<Nota>()));
            }
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota>, Error>(new DataBaseException(e)));
        }
    }

    async buscarNotasPorTitulo(idUser:IdUser, titulo:TituloNota):Promise<Either<Optional<Nota[]>, Error>>{
        try {
            const data = await this.notamodel.find({$and:[{usuarioId: idUser.getId()},{titulo: {$regex: titulo.getTitulo()}}]}).sort({fechaActualizacion:-1});
            const notas:Nota[] = this.transformList(data);
            if(!(notas.length === 0))
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>(notas)));
            else
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>()));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota[]>, Error>(new DataBaseException(e)))
        }
    }

    async buscarNotasPorCuerpo(idUser:IdUser, texto:TextoPlanoCuerpo):Promise<Either<Optional<Nota[]>, Error>>{
        try {
            const text = texto.getParteSnapshot();

            const data = await this.notamodel.find({$and:[{usuarioId: idUser.getId()},
                                                    {"cuerpo.tipo":"Texto Plano"}, {"cuerpo.texto": {$regex: text.texto}}]}).sort({fechaActualizacion:-1});;
            const notas:Nota[] = this.transformList(data);
            if(!(notas.length === 0))
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>(notas)));
            else
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>()));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota[]>, Error>(new DataBaseException(e)))
        }
    }
    
    async buscarNotasPorEtiqueta(idUser:IdUser, idTag:IdEtiqueta):Promise<Either<Optional<Nota[]>, Error>>{
        //NO IMPLEMENTADO
        return Promise.resolve(undefined);
    }

    async buscarNotasPorFechaActualizacion(idUser:IdUser, fecha:FechaNota):Promise<Either<Optional<Nota[]>, Error>>{
        try {
            const data = await this.notamodel.find({$and:[{usuarioId: idUser.getId()},{fechaActualizacion:fecha.getFecha()}]}).sort({fechaActualizacion:-1});;
            const notas:Nota[] = this.transformList(data);
            if(!(notas.length === 0))
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>(notas)));
            else
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>()));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota[]>, Error>(new DataBaseException(e)))
        }
    }

    async buscarNotasPorFechaCreacion(idUser:IdUser, fecha:FechaNota):Promise<Either<Optional<Nota[]>, Error>>{
        try {
            const data = await this.notamodel.find({$and:[{usuarioId: idUser.getId()},{fechaCreacion:fecha.getFecha()}]}).sort({fechaActualizacion:-1});;
            const notas:Nota[] = this.transformList(data);
            if(!(notas.length === 0))
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>(notas)));
            else
                return Promise.resolve(Either.makeLeft<Optional<Nota[]>,Error>(new Optional<Nota[]>()));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota[]>, Error>(new DataBaseException(e)))
        }
    }

    //========================================================================================================//
    //========================================================================================================//
    //========================================================================================================//


    //GuardarNota en la Base de Datos
    async guardarNota(nota:Nota): Promise<Either<Nota, Error>> {
        const snapshot:NotaSnapshot = nota.getSnapshot();
        try {
            const notaGuardada = await (new this.notamodel(snapshot)).save();
            const notaSnapshot = ConvertidorNota.convertirASnapshot(notaGuardada);
            if(notaSnapshot.isLeft()){
                const notaConfirmada = FabricaRestaurarNota.restaurarNota(notaSnapshot.getLeft());
                return Either.makeLeft<Nota, Error>(notaConfirmada);
            } else{
                return Promise.resolve(Either.makeRight<Nota, Error>(notaSnapshot.getRight()))
            }
        } catch (e) {
            return Either.makeRight<Nota, Error>(new DataBaseException(e));
        }
    }

    async eliminarNota(id:IdNota):Promise<Either<Optional<IdNota>, Error>>{
        try {
            const notaGuardada = await this.notamodel.deleteOne(/*{$and:[*/{notaId: id.getId()}/*,{}]}*/);
            return Promise.resolve(Either.makeLeft<Optional<IdNota>, Error>(new Optional<IdNota>(id)));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<IdNota>, Error>(new DataBaseException(e)));
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
            const notaSnapshot = ConvertidorNota.convertirASnapshot(updatedNota);
            if(notaSnapshot.isLeft()){
                const notaConfirmada = FabricaRestaurarNota.restaurarNota(notaSnapshot.getLeft());
                return Promise.resolve(Either.makeLeft<Optional<Nota>, Error>(new Optional<Nota>(notaConfirmada)));
            } else{
                return Promise.resolve(Either.makeRight<Optional<Nota>, Error>(notaSnapshot.getRight()));
            }   
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<Nota>, Error>(new DataBaseException(e)));
        } 
    }
}