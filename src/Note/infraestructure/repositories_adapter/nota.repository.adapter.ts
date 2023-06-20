import { ExceptionFilter, Injectable } from "@nestjs/common";
import { Nota } from "src/Note/domain/Nota";
import { notaModel } from "src/Note/infraestructure/schemas/nota.schema";
import {InjectModel} from '@nestjs/mongoose'
import { Either } from "src/core/ortogonal_solutions/Either";
import { Optional } from "src/core/ortogonal_solutions/Optional";
import { RepositorioNota } from "src/Note/domain/repositories/RepositorioNota";
import { MementoNota } from "src/Note/domain/MementoNota";
import { Error } from "mongoose";
import { BSON, MongoError } from "mongodb";
import { FabricaNota } from "src/Note/domain/fabrics/FabricaNota";
import { ActualizarNotaComando } from "src/Note/application/AcualizarNota/ActualizarNotaComando";
import { IdNota } from "src/Note/domain/value_objects/IdNota";


@Injectable()
export class MongoNotaRepositorio{
    constructor(@InjectModel(Nota.name) private readonly notamodel:notaModel){}

    async CrearNota(nota:MementoNota): Promise<Either<Optional<MementoNota>, Error>> {

        try {
            const notaGuardada = await (new this.notamodel(nota)).save();
            return Promise.resolve(Either.makeLeft<Optional<MementoNota>, Error>(new Optional<MementoNota>(nota)));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<MementoNota>, Error>(e));
        }
    }

    async BuscarnotasDeusuario(id:string):Promise<Either<Optional<MementoNota[]>, Error>>{
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

    async BorrarNota(id:string):Promise<Either<Optional<string>, Error>>{
        try {
            const data = await this.notamodel.deleteOne({notaId:id})
            return Promise.resolve(Either.makeLeft<Optional<string>, Error>(new Optional<string>(id)));
        } catch (e) {
            return Promise.resolve(Either.makeRight<Optional<string>, Error>(e));
        }
    }

    async ActualizarNota(nota:ActualizarNotaComando): Promise<Either<IdNota, Error>> {
        const notaId2:string = nota.notaId;
        const titulo:string = nota.titulo;
        const cuerpo:string = nota.cuerpo;
        const fechaEliminacion = nota.fechaEliminacion.getValue();
        const fechaActualizacion = nota.fechaActualizacion;



        try {
            const updatedNota = await this.notamodel.findOneAndUpdate(
                { notaId:notaId2 },
                {titulo,cuerpo,fechaEliminacion,fechaActualizacion},
                { new: true },
            )
            const id:IdNota = new IdNota(notaId2);
            return Promise.resolve(Either.makeLeft<IdNota, Error>(id));
        } catch (e) {
            return Promise.resolve(Either.makeRight<IdNota, Error>(e));
        }

        


        
    }
}