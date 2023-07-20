import { TipoComando } from "../Shared_Enums/TipoComandoNotas";

export abstract class ICommand{
    protected tipoComando:TipoComando;

    getType():TipoComando{ return this.tipoComando}
}