import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CrearNotaComando } from 'src/Note/application/crear_Nota/CrearNotaComando';
import { CrearNotaDTO } from './DTOs/CrearNotaDTO';
import { CommandHandler } from '../../../Shared/application/Shared_Commands/CommandHandler';
import { TipoComando } from 'src/Shared/application/Shared_Enums/TipoComandoNotas';
import { IServicio } from 'src/Shared/application/Shared_Commands/IServicio';
import { CrearNota } from 'src/Note/application/crear_Nota/CrearNota';
import { GeneradorUUID } from '../UUID/GeneradorUUID';
import { Either } from 'src/Shared/utilities/Either';
import { Optional } from 'src/Shared/utilities/Optional';
import { NotaSnapshot } from 'src/Note/domain/Snapshot/NotaSnapshot';
import { EliminarNota } from 'src/Note/application/eliminar_Nota/EliminarNota';
import { EliminarNotaDTO } from './DTOs/EliminarNotaDTO';
import { EliminarNotaComando } from '../../application/eliminar_Nota/EliminarNotaComando';
import { MongoNotaAdapter } from '../repositories_adapter/MongoNotaAdapter';
import { ModificarNotaDTO } from './DTOs/ModificarNotaDTO';
import { ModificarNota } from 'src/Note/application/modificar_Nota/ModificarNota';
import { ModificarNotaComando } from 'src/Note/application/modificar_Nota/ModificarNotaComando';
import { ReceptorParteCuerpo } from 'src/Note/domain/fabrics/Shared_ParteCuerpo/ReceptorParteCuerpo';
import { ParteCuerpoDTO} from './DTOs/ParteCuerpoDTO';
import { ParteCuerpoValidacion } from './ParteCuerpoValidacion';
import { QueryHandler } from 'src/Shared/application/Shared_Querys/QueryHandler';
import { IServicioQuery } from 'src/Shared/application/Shared_Querys/IServicioQuery';
import { IdNotaQueryService } from 'src/Note/application/querys_Nota/buscarId_Nota/IdNotaQueryService';
import { ActualizacionNotaQueryService} from 'src/Note/application/querys_Nota/buscarActualizacion_Nota/ActualizacionNotaQueryService';
import { CreacionNotaQueryService } from 'src/Note/application/querys_Nota/buscarCreacion_Nota/CreacionNotaQueryService';
import { TituloNotaQueryService } from 'src/Note/application/querys_Nota/buscarTitulo_Nota/TituloNotaQueryService';
import { CuerpoNotaQueryService } from 'src/Note/application/querys_Nota/buscarCuerpo_Nota/CuerpoNotaQueryService';
import { UserNotaQueryService } from 'src/Note/application/querys_Nota/buscarUser_Nota/UserNotaQueryService';
import { TipoQuery } from 'src/Shared/application/Shared_Enums/TipoQueryNotas';
import { IdNotaQuery } from 'src/Note/application/querys_Nota/buscarId_Nota/IdNotaQuery';
import { UserNotaQuery } from 'src/Note/application/querys_Nota/buscarUser_Nota/UserNotaQuery';
import { TituloNotaQuery } from 'src/Note/application/querys_Nota/buscarTitulo_Nota/TituloNotaQuery';
import { CuerpoNotaQuery } from 'src/Note/application/querys_Nota/buscarCuerpo_Nota/CuerpoNotaQuery';
import { CreacionNotaQuery } from 'src/Note/application/querys_Nota/buscarCreacion_Nota/CreacionNotaQuery';
import { ActualizacionNotaQuery } from 'src/Note/application/querys_Nota/buscarActualizacion_Nota/ActualizacionNotaQuery';

@Controller('nota')
export class NotaController {
    private commandHandler:CommandHandler<NotaSnapshot> = new CommandHandler<NotaSnapshot>();
    private queryHandler:QueryHandler<NotaSnapshot[]> = new QueryHandler<NotaSnapshot[]>();

    constructor(private adapter: MongoNotaAdapter){
        /*INYECCION DE DEPENDENCIAS*/
        /*COMMANDS */
        const servicioCrearNota:IServicio<NotaSnapshot> = new CrearNota(new GeneradorUUID(), adapter);
        this.commandHandler.addComando(servicioCrearNota, TipoComando.CrearNota);

        const servicioEliminarNota:IServicio<NotaSnapshot> = new EliminarNota(adapter);
        this.commandHandler.addComando(servicioEliminarNota, TipoComando.EliminarNota);

        const servicioModificarNota:IServicio<NotaSnapshot> = new ModificarNota(adapter);
        this.commandHandler.addComando(servicioModificarNota, TipoComando.ModificarNota);


        /*QUERIES */
        const servicioBuscarIdNota:IServicioQuery<NotaSnapshot[]> = new IdNotaQueryService(adapter);
        this.queryHandler.addComando(servicioBuscarIdNota, TipoQuery.idNota);

        const servicioBuscarTituloNota:IServicioQuery<NotaSnapshot[]> = new TituloNotaQueryService(adapter);
        this.queryHandler.addComando(servicioBuscarTituloNota, TipoQuery.titulo);

        const servicioBuscarCuerpoNota:IServicioQuery<NotaSnapshot[]> = new CuerpoNotaQueryService(adapter);
        this.queryHandler.addComando(servicioBuscarCuerpoNota, TipoQuery.cuerpo);

        const servicioBuscarCreacionNota:IServicioQuery<NotaSnapshot[]> = new CreacionNotaQueryService(adapter);
        this.queryHandler.addComando(servicioBuscarCreacionNota, TipoQuery.fechaCreacion);

        const servicioBuscarActualizacionNota:IServicioQuery<NotaSnapshot[]> = new ActualizacionNotaQueryService(adapter);
        this.queryHandler.addComando(servicioBuscarActualizacionNota, TipoQuery.fechaActualizacion);

        const servicioBuscarUserNota:IServicioQuery<NotaSnapshot[]> = new UserNotaQueryService(adapter);
        this.queryHandler.addComando(servicioBuscarUserNota, TipoQuery.user);
    }

    @Get('/:id/user/:idUser/')
    async getNoteById(@Param('idUser') iduser ,@Param('id') id){
        /*const nota:Either<Optional<Nota>, Error> = await this.adapter.buscarNotaPorId(new IdUser(iduser), new IdNota(id));
        if (nota.isLeft()){
            if (nota.getLeft().HasValue())
                return Either.makeLeft<Optional<NotaSnapshot>, Error>(new Optional<NotaSnapshot>(nota.getLeft().getValue().getSnapshot()));
            else
                return Either.makeLeft<Optional<NotaSnapshot>, Error>(new Optional<NotaSnapshot>());
        }
        else {
            return Either.makeRight<Optional<NotaSnapshot>, Error>(nota.getRight());
        }*/
        const query = new IdNotaQuery(iduser, id);
        return this.queryHandler.query(query);
        
    }

    @Get('/user/:id')
    async getNotesByUser(@Param('id') id){
        /*const notas:Either<Optional<Nota[]>, Error> = await this.adapter.buscarNotasPorUsuario(new IdUser(id));

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
        }*/
        const query = new UserNotaQuery(id);
        return this.queryHandler.query(query);
    }

    @Get('/user/:id/titulo/:title')
    async getNotesByTitle(@Param('id') id, @Param('title') titulo){
        /*const notas:Either<Optional<Nota[]>, Error> = await this.adapter.buscarNotasPorTitulo(new IdUser(id), new TituloNota(titulo));

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
        }*/
        const query = new TituloNotaQuery(id, titulo);
        return this.queryHandler.query(query);
    }

    @Get('/user/:id/cuerpo/:body')
    async getNotesByBody(@Param('id') id, @Param('body') cuerpo){
        /*const notas:Either<Optional<Nota[]>, Error> = await this.adapter.buscarNotasPorCuerpo(new IdUser(id), new TextoPlanoCuerpo(cuerpo));

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
        }*/
        
        const query = new CuerpoNotaQuery(id, cuerpo);
        return this.queryHandler.query(query);
    }

    @Get('/user/:id/creacion/:fecha')
    async getNotesByFechaCreacion(@Param('id') id, @Param('fecha') fecha){
        /*const notas:Either<Optional<Nota[]>, Error> = await this.adapter.buscarNotasPorFechaCreacion(new IdUser(id), new FechaNota(fecha));

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
        }*/
        const query = new CreacionNotaQuery(id, fecha);
        return this.queryHandler.query(query);
    }

    @Get('/user/:id/actualizacion/:fecha')
    async getNotesByFechaActualizacion(@Param('id') id, @Param('fecha') fecha){
        /*const notas:Either<Optional<Nota[]>, Error> = await this.adapter.buscarNotasPorFechaActualizacion(new IdUser(id), new FechaNota(fecha));

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
        }*/
        const query = new ActualizacionNotaQuery(id, fecha);
        return this.queryHandler.query(query);
    }

    //========================================================================================================//
    //========================================================================================================//
    //========================================================================================================//

    //========================================================================================================//
    //========================================================================================================//
    //========================================================================================================//


    @Post()
    @UsePipes(ValidationPipe)
    async crearNota(@Body() nuevaNota:CrearNotaDTO){
        const validacion:ParteCuerpoValidacion = new ParteCuerpoValidacion();
        if (!validacion.cuerpoValidacion(nuevaNota.cuerpo)){
            return new Error();
        }
        
        const fechaeliminada:Optional<Date> = new Optional<Date>(nuevaNota.fechaEliminacion);
        const latitud:Optional<number> = new Optional<number>(nuevaNota.latitud);
        const altitud:Optional<number> = new Optional<number>(nuevaNota.altitud);

        //Validar que un valor de ubicacion si se tiene pero el otro no
        if (!latitud.HasValue() && altitud.HasValue()){
            return Either.makeRight<NotaSnapshot,Error>(new Error());
        } else if (latitud.HasValue() && !altitud.HasValue()){
            return Either.makeRight<NotaSnapshot,Error>(new Error());
        }

        let cuerpoCmd:Array<ReceptorParteCuerpo> = new Array<ReceptorParteCuerpo>();



        const cmd:CrearNotaComando = new CrearNotaComando(nuevaNota.titulo, nuevaNota.cuerpo, nuevaNota.fechaCreacion, fechaeliminada,
                                                            nuevaNota.fechaActualizacion, latitud, altitud, nuevaNota.usuarioId);
                                                                                        
        const result:Either<NotaSnapshot,Error> = await this.commandHandler.execute(cmd);
        console.log("RESULTDADO",result);    
        return result;
    }

    @Post('/testValidation')
    @UsePipes(ValidationPipe)
    async testValidation(@Body() nuevaNota:CrearNotaDTO){
        const validacion:ParteCuerpoValidacion = new ParteCuerpoValidacion()
        console.log(nuevaNota.cuerpo);
        console.log("=============================================");
        console.log(validacion.cuerpoValidacion(nuevaNota.cuerpo));
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
        const cuerpo:Optional<Array<ParteCuerpoDTO>> = new Optional<Array<ParteCuerpoDTO>>(nota.cuerpo);
        const latitud:Optional<number> = new Optional<number>(nota.latitud);
        const altitud:Optional<number> = new Optional<number>(nota.altitud);

        const validacion:ParteCuerpoValidacion = new ParteCuerpoValidacion();
        if (cuerpo.HasValue() && (!validacion.cuerpoValidacion(nota.cuerpo))){
            return new Error();
        }

        //Validar que un valor de ubicacion si se tiene pero el otro no
        if (!latitud.HasValue() && altitud.HasValue()){
            return Either.makeRight<NotaSnapshot,Error>(new Error());
        } else if (latitud.HasValue() && !altitud.HasValue()){
            return Either.makeRight<NotaSnapshot,Error>(new Error());
        }

        const cmd:ModificarNotaComando = new ModificarNotaComando(nota.id,nota.fechaActualizacion,titulo, 
                                                                    cuerpo, 
                                                                    fechaeliminada, 
                                                                    latitud, altitud, nota.usuarioId);
        const result:Either<NotaSnapshot,Error> = await this.commandHandler.execute(cmd);

        return result;
    }
}
