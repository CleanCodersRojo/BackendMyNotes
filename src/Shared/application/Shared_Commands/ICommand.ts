import { TipoComando } from "./TipoComandoNotas";

export abstract class ICommand{
    protected tipoComando:TipoComando;

    getType():TipoComando{ return this.tipoComando}
}