export class Optional<T>{
    private value: T | null = null;
    private assign:boolean = false;

    constructor(v?: T){
        if (v != null) {
            this.assign = true;
            this.value = v;
        }
    }


    public HasValue():boolean{
        return this.assign;
    }

    public getValue(): T{
        if(this.assign){
            return this.value as T;
        }
        else
            throw Error("Mal uso de la abstraccion OPTIONAL");
    }
}