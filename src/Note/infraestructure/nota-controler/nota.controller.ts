import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CrearNotaComando } from 'src/Note/application/crear_Nota/CrearNotaComando';
import { CrearNotaDTO } from './CrearNotaDTO';
import { CommandHandler } from '../../../Shared/application/Shared_Commands/CommandHandler';
import { TipoComando } from 'src/Shared/application/Shared_Commands/TipoComandoNotas';
import { IServicio } from 'src/Shared/application/Shared_Commands/IServicio';
import { CrearNota } from 'src/Note/application/crear_Nota/CrearNota';
import { GeneradorUUID } from '../UUID/GeneradorUUID';
import { Either } from 'src/Shared/utilities/Either';
import { Optional } from 'src/Shared/utilities/Optional';
import { NotaSnapshot } from 'src/Note/domain/Snapshot/NotaSnapshot';
import { EliminarNota } from 'src/Note/application/eliminar_Nota/EliminarNota';
import { EliminarNotaDTO } from './EliminarNotaDTO';
import { EliminarNotaComando } from '../../application/eliminar_Nota/EliminarNotaComando';
import { IdNota } from 'src/Note/domain/value_objects/IdNota';
import { MongoNotaAdapter } from '../repositories_adapter/MongoNotaAdapter';
import { ModificarNotaDTO } from './ModificarNotaDTO';
import { ModificarNota } from 'src/Note/application/modificar_Nota/ModificarNota';
import { ModificarNotaComando } from 'src/Note/application/modificar_Nota/ModificarNotaComando';
import { IdUser } from 'src/User/domain/value_objects/IdUser';
import { Nota } from 'src/Note/domain/Nota';
import { ParteCuerpoSnapshot } from 'src/Note/domain/Snapshot/ParteCuerpoSnapshot';

@Controller('nota')
export class NotaController {
    private commandHandler:CommandHandler<NotaSnapshot> = new CommandHandler();

    constructor(private adapter: MongoNotaAdapter){
        /*INYECCION DE DEPENDENCIAS*/
        const servicioCrearNota:IServicio<NotaSnapshot> = new CrearNota(new GeneradorUUID(), adapter);
        this.commandHandler.addComando(servicioCrearNota, TipoComando.CrearNota);

        const servicioEliminarNota:IServicio<NotaSnapshot> = new EliminarNota(adapter);
        this.commandHandler.addComando(servicioEliminarNota, TipoComando.EliminarNota);

        const servicioModificarNota:IServicio<NotaSnapshot> = new ModificarNota(adapter);
        this.commandHandler.addComando(servicioModificarNota, TipoComando.ModificarNota);
    }

    @Get(':id')
    async getNoteById(@Param('id') id){
        const nota:Either<Optional<Nota>, Error> = await this.adapter.buscarNotaPorId(new IdNota(id));
        if (nota.isLeft()){
            if (nota.getLeft().HasValue())
                return Either.makeLeft<Optional<NotaSnapshot>, Error>(new Optional<NotaSnapshot>(nota.getLeft().getValue().getSnapshot()));
            else
                return Either.makeLeft<Optional<NotaSnapshot>, Error>(new Optional<NotaSnapshot>());
        }
        else {
            return Either.makeRight<Optional<NotaSnapshot>, Error>(nota.getRight());
        }
        
    }

    @Get('/byUser/:id')
    async getNotesByUser(@Param('id') id){
        const notas:Either<Optional<Nota[]>, Error> = await this.adapter.buscarNotasPorUsuario(new IdUser(id));
        
        if (notas.isLeft()){
            if (notas.getLeft().HasValue()){
                let snapshots:NotaSnapshot[] = [];
                for (const nota of notas.getLeft().getValue()){
                    snapshots.push(nota.getSnapshot());
                }
                return Either.makeLeft<Optional<NotaSnapshot[]>, Error>(new Optional<NotaSnapshot[]>(snapshots));
            }
            else{
                return Either.makeLeft<Optional<NotaSnapshot[]>, Error>(new Optional<NotaSnapshot[]>());
            }
        }
        else{
            return Either.makeRight<Optional<NotaSnapshot[]>, Error>(notas.getRight());
        }
    }

    @Post()
    @UsePipes(ValidationPipe)
    async crearNota(@Body() nuevaNota:CrearNotaDTO){
        const fechaeliminada:Optional<Date> = new Optional<Date>(nuevaNota.fechaEliminacion);
        const latitud:Optional<number> = new Optional<number>(nuevaNota.latitud);
        const altitud:Optional<number> = new Optional<number>(nuevaNota.altitud);

        //Validar que un valor de ubicacion si se tiene pero el otro no
        if (!latitud.HasValue() && altitud.HasValue()){
            return Either.makeRight<NotaSnapshot,Error>(new Error());
        } else if (latitud.HasValue() && !altitud.HasValue()){
            return Either.makeRight<NotaSnapshot,Error>(new Error());
        }

        const cmd:CrearNotaComando = new CrearNotaComando(nuevaNota.titulo, nuevaNota.cuerpo, nuevaNota.fechaCreacion, fechaeliminada,
                                                            nuevaNota.fechaActualizacion, latitud, altitud, nuevaNota.usuarioId);
        console.log("CrearNotaComando",cmd);                              
        const result:Either<NotaSnapshot,Error> = await this.commandHandler.execute(cmd);
        console.log("RESULTDADO",result);    
        return result;
    }

    @Delete()
    @UsePipes(ValidationPipe)
    async eliminarNota(@Body() nota:EliminarNotaDTO){
        const cmd:EliminarNotaComando = new EliminarNotaComando(nota.id,nota.fechaEliminacion, nota.usuarioId);
        const result:Either<NotaSnapshot,Error> = await this.commandHandler.execute(cmd);

        return result;
    }

    @Patch()
    @UsePipes(ValidationPipe)
    async modificarNota(@Body() nota:ModificarNotaDTO){
        const fechaeliminada:Optional<Date> = new Optional<Date>(nota.fechaEliminacion);
        const titulo:Optional<string> = new Optional<string>(nota.titulo);
        const cuerpo:Optional<Array<ParteCuerpoSnapshot>> = new Optional<Array<ParteCuerpoSnapshot>>(nota.cuerpo);
        const latitud:Optional<number> = new Optional<number>(nota.latitud);
        const altitud:Optional<number> = new Optional<number>(nota.altitud);

        //Validar que un valor de ubicacion si se tiene pero el otro no
        if (!latitud.HasValue() && altitud.HasValue()){
            return Either.makeRight<NotaSnapshot,Error>(new Error());
        } else if (latitud.HasValue() && !altitud.HasValue()){
            return Either.makeRight<NotaSnapshot,Error>(new Error());
        }

        const cmd:ModificarNotaComando = new ModificarNotaComando(nota.id,nota.fechaActualizacion,titulo, cuerpo, fechaeliminada, 
                                                                    latitud, altitud, nota.usuarioId);
        const result:Either<NotaSnapshot,Error> = await this.commandHandler.execute(cmd);

        return result;
    }
}
