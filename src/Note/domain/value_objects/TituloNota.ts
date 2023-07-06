import { IValueObject } from "src/Shared/domain/IValueObject";

export class TituloNota implements IValueObject{
    private titulo:string = "";

    constructor(s:string){
        this.titulo = s.substring(0, 50);
    }

    public equals(other: TituloNota): boolean{
        if (other.getTitulo() == this.getTitulo())
            return true;
        else
            return false;
    }

    public getTitulo():string{
        return this.titulo;
    }
}