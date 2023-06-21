import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CrearNotaComando } from 'src/Note/application/crear_Nota/CrearNotaComando';
import { CrearNotaDTO } from './CrearNotaDTO';
import { CommandHandler } from '../../../core/application/core_Comandos/CommandHandler';
import { TipoComando } from 'src/core/application/core_Comandos/TipoComandoNotas';
import { IServicio } from 'src/core/application/core_Comandos/IServicio';
import { CrearNota } from 'src/Note/application/crear_Nota/CrearNota';
import { GeneradorUUID } from '../UUID/GeneradorUUID';
import { Either } from 'src/core/ortogonal_solutions/Either';
import { Optional } from 'src/core/ortogonal_solutions/Optional';
import { MementoNota } from 'src/Note/domain/MementoNota';
import { EliminarNota } from 'src/Note/application/eliminar_Nota/EliminarNota';
import { EliminarNotaDTO } from './EliminarNotaDTO';
import { EliminarNotaComando } from '../../application/eliminar_Nota/EliminarNotaComando';
import { IdNota } from 'src/Note/domain/value_objects/IdNota';
import { RepositorioNota } from 'src/Note/domain/repositories/RepositorioNota';
import { MongoNotaAdapter } from '../repositories_adapter/MongoNotaAdapter';
import { ModificarNotaDTO } from './ModificarNotaDTO';
import { ModificarNota } from 'src/Note/application/modificar_Nota/ModificarNota';
import { ModificarNotaComando } from 'src/Note/application/modificar_Nota/ModificarNotaComando';

@Controller('nota')
export class NotaController {
    private commandHandler:CommandHandler<MementoNota> = new CommandHandler();

    constructor(private adapter: MongoNotaAdapter){
        /*INYECCION DE DEPENDENCIAS*/
        const servicioCrearNota:IServicio<MementoNota> = new CrearNota(new GeneradorUUID(), adapter);
        this.commandHandler.addComando(servicioCrearNota, TipoComando.CrearNota);

        const servicioEliminarNota:IServicio<MementoNota> = new EliminarNota(adapter);
        this.commandHandler.addComando(servicioEliminarNota, TipoComando.EliminarNota);

        const servicioModificarNota:IServicio<MementoNota> = new ModificarNota(adapter);
        this.commandHandler.addComando(servicioModificarNota, TipoComando.ModificarNota);
    }

    @Get(':id')
    async getNoteById(@Param('id') id){
        return await this.adapter.buscarNotaPorId(new IdNota(id));
    }

    @Post()
    @UsePipes(ValidationPipe)
    async crearNota(@Body() nuevaNota:CrearNotaDTO){
        
        const fechaeliminada:Optional<Date> = new Optional<Date>(nuevaNota.fechaEliminacion);
        const latitud:Optional<number> = new Optional<number>(nuevaNota.latitud);
        const altitud:Optional<number> = new Optional<number>(nuevaNota.altitud);

        //Validar que un valor de ubicacion si se tiene pero el otro no
        if (!latitud.HasValue() && altitud.HasValue()){
            return Either.makeRight<MementoNota,Error>(new Error());
        } else if (latitud.HasValue() && !altitud.HasValue()){
            return Either.makeRight<MementoNota,Error>(new Error());
        }

        const cmd:CrearNotaComando = new CrearNotaComando(nuevaNota.titulo, nuevaNota.cuerpo, nuevaNota.fechaCreacion, fechaeliminada,
                                                            nuevaNota.fechaActualizacion, latitud, altitud, nuevaNota.usuarioId);
        
        const result:Either<MementoNota,Error> = await this.commandHandler.execute(cmd);

        if (result.isLeft()){
            return result.getLeft();
        }
        else{
            return result.getRight();
        }
    }

    @Delete()
    @UsePipes(ValidationPipe)
    async eliminarNota(@Body() nota:EliminarNotaDTO){
        const cmd:EliminarNotaComando = new EliminarNotaComando(nota.id,nota.fechaEliminacion, nota.usuarioId);
        const result:Either<MementoNota,Error> = await this.commandHandler.execute(cmd);

        if (result.isLeft()){
            return result.getLeft();
        }
        else{
            return result.getRight();
        }
    }

    @Patch()
    @UsePipes(ValidationPipe)
    async modificarNota(@Body() nota:ModificarNotaDTO){
        const fechaeliminada:Optional<Date> = new Optional<Date>(nota.fechaEliminacion);
        const titulo:Optional<string> = new Optional<string>(nota.tituloModificado);
        const cuerpo:Optional<string> = new Optional<string>(nota.cuerpoModificado);
        const latitud:Optional<number> = new Optional<number>(nota.latitud);
        const altitud:Optional<number> = new Optional<number>(nota.altitud);

        //Validar que un valor de ubicacion si se tiene pero el otro no
        if (!latitud.HasValue() && altitud.HasValue()){
            return Either.makeRight<MementoNota,Error>(new Error());
        } else if (latitud.HasValue() && !altitud.HasValue()){
            return Either.makeRight<MementoNota,Error>(new Error());
        }

        const cmd:ModificarNotaComando = new ModificarNotaComando(nota.id,nota.fechaActualizacion,titulo, cuerpo, fechaeliminada, 
                                                                    latitud, altitud, nota.usuarioId);
        const result:Either<MementoNota,Error> = await this.commandHandler.execute(cmd);

        if (result.isLeft()){
            return result.getLeft();
        }
        else{
            return result.getRight();
        }
    }
}
