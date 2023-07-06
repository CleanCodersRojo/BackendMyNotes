import { IServicio } from "./IServicio";
import { ICommand } from "./ICommand";
import { TipoComando } from "./TipoComandoNotas";
import { Either } from 'src/Shared/utilities/Either';

export class CommandHandler<TView>{
    private comandos:Map<TipoComando, IServicio<TView>>;

    constructor(){
        this.comandos = new Map();
    }

    public execute(dto:ICommand):Promise<Either<TView,Error>>{
        for (let key of this.comandos.keys()) {
            if (dto.getType() == key){
                return this.comandos.get(key).execute(dto);
            }
        }
    }

    addComando(comando:IServicio<TView>, tipo:TipoComando){
        this.comandos.set(tipo, comando);
    }
}