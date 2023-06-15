import { IValueObject } from "src/core/domain/IValueObject";

export class FechaNota implements IValueObject{
    private date:Date;
    
    constructor(d:Date){
        this.date = d;
        /*let testStart:Date = new Date("12/06/2023"); 
        //La fecha minima se puede colocar como el primer dia en que se empieza la prueba
        if (d.getTime() >= testStart.getTime())
            this.date = d;
        else //Manejo de errores para los value objects
            throw Error("Fecha Invalida");*/
    }

    public equals(other: FechaNota): boolean{
        if (other.getFecha() == this.getFecha())
            return true;
        else
            return false;
    }

    public getFecha():Date {
        return this.date;
    }
}