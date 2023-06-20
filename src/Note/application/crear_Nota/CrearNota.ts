import { Either } from "src/core/ortogonal_solutions/Either";
import { IServicio } from "../../../core/application/core_Comandos/IServicio";
import { CrearNotaComando } from "./CrearNotaComando";
import { IGeneradorUUID } from '../../../core/application/core_Comandos/IGeneradorUUID';
import { Nota } from "src/Note/domain/Nota";
import { FabricaNota } from "src/Note/domain/fabrics/FabricaNota";
import { MementoNota} from "../../domain/MementoNota";
import { RepositorioNota } from "src/Note/domain/repositories/RepositorioNota";
import { Optional } from "src/core/ortogonal_solutions/Optional";

export class CrearNota implements IServicio<MementoNota>{
    private readonly generadorUUID:IGeneradorUUID;
    private readonly repositorio:RepositorioNota;

    constructor(g:IGeneradorUUID, r:RepositorioNota){
        this.generadorUUID = g;
        this.repositorio = r;
    }

    public async execute(cmd:CrearNotaComando):Promise<Either<MementoNota, Error>>{
        /*
            generar uuid  ####
            crear objecto 
            "guardar nota"
                - publicar evento de notacreada
                - guardar y actualizar lo que se deba actualizar  
        */
        let notaId:string = this.generadorUUID.generate();
        let nota:Nota = FabricaNota.fabricar(notaId, cmd.titulo,cmd.cuerpo,cmd.fechaCreacion,cmd.fechaEliminacion,cmd.fechaActualizacion,
                                                cmd.latitud,cmd.altitud, cmd.usuarioId);
        
        console.log(nota);    
        const vistaNota:MementoNota = nota.guardar();
        const nuevaNota:Either<Optional<MementoNota>, Error> = await this.repositorio.CrearNota(vistaNota);
        
        return Either.makeLeft<MementoNota, Error>(nuevaNota.getLeft().getValue());
    }
}