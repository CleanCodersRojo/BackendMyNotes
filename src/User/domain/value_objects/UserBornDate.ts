import { IValueObject } from "src/Shared/domain/IValueObject";

export class UserBornDate implements IValueObject{
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

    public equals(other: UserBornDate): boolean{
        if (other.getFecha() == this.getFecha())
            return true;
        else
            return false;
    }

    public getFecha():Date {
        return this.date;
    }
}