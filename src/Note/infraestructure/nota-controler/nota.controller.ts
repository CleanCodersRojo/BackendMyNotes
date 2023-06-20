import { Body, Controller, Get, Inject, Param, Post, UsePipes, ValidationPipe,Delete } from '@nestjs/common';
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
import { MongoNotaAdapter } from '../repositories_adapter/MongoNotaAdapter';
import { IdNota } from 'src/Note/domain/value_objects/IdNota';
import { ActualizarNotaComando } from 'src/Note/application/AcualizarNota/ActualizarNotaComando';
import { ActualizarNotaDTO } from './ActualizarNotaDTO';
import { ActualizarNota } from 'src/Note/application/AcualizarNota/ActualizarNota';

@Controller('nota')
export class NotaController {
    @Inject(MongoNotaAdapter) private Service: MongoNotaAdapter;

    commandHandler:CommandHandler<MementoNota> = new CommandHandler();

    constructor(private adapter: MongoNotaAdapter){
        /*INYECCION DE DEPENDENCIAS*/
        const servicioCrearNota:IServicio<MementoNota> = new CrearNota(new GeneradorUUID(), adapter);
        this.commandHandler.addComando(servicioCrearNota, TipoComando.CrearNota);
    }

  
    @Get('findbyuserid/:id')
     async buscarnotasporUsuario(@Param('id') id:string){
        const result:Either<Optional<MementoNota[]>,Error> = await this.Service.BuscarnotasDeusuario(id);
        if (result.isLeft()){
            return result.getLeft();
        }
        else{
            return "prueba fallida"
        }
        
    }


    @Delete(':id')
    async borrarNota(@Param('id') id:string){
        const result:Either<Optional<string>,Error> = await this.Service.BorrarNota(id); 
        if (result.isLeft()){
            return result.getLeft();
        }
        else{
            return "prueba fallida"
        }
    }



    @Post()
    @UsePipes(ValidationPipe)
    async crearNota(@Body() nuevaNota:CrearNotaDTO){
        
        const fechaeliminada:Optional<Date> = new Optional<Date>(nuevaNota.fechaEliminacion);
        const cmd:CrearNotaComando = new CrearNotaComando(nuevaNota.titulo, nuevaNota.cuerpo, nuevaNota.fechaCreacion, fechaeliminada,
                                                            nuevaNota.fechaActualizacion, nuevaNota.latitud, nuevaNota.altitud, 
                                                            nuevaNota.usuarioId);
        
        const result:Either<MementoNota,Error> = await this.commandHandler.execute(cmd);

        if (result.isLeft()){
            return result.getLeft();
        }
        else{
            return "prueba fallida"
        }
    }

    @Post('update')
    @UsePipes(ValidationPipe)
    async actualizarNota(@Body() Actualizarnota:ActualizarNotaDTO){

         const fechaeliminada:Optional<Date> = new Optional<Date>(Actualizarnota.fechaEliminacion);
        const cmd:ActualizarNotaComando = new ActualizarNotaComando(Actualizarnota.notaId,Actualizarnota.titulo, Actualizarnota.cuerpo,fechaeliminada,
                                                            Actualizarnota.fechaActualizacion);
                                             
        const servicioActualizarNota:IServicio<IdNota> = new ActualizarNota(this.Service);
        
        const result:Either<IdNota,Error> = await servicioActualizarNota.execute(cmd);
        if (result.isLeft()){
            return result.getLeft();
        }
        else{
            return "prueba fallida"
        }
    }


}
