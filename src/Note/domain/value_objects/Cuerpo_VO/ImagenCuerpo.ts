import { IValueObject } from "src/Shared/domain/IValueObject";
import { TipoParteCuerpo } from "./TipoParteCuerpo";
import { ParteCuerpo } from "./ParteCuerpo";
import { EnumAlineacionTexto } from "./EnumAlineacionTexto";
import { ImagenSnapshot } from "../../Snapshot/ImagenSnapshot";
import { ConstructorImagenCuerpo } from "../../fabrics/Constructores_ParteCuerpo/ConstructorImagenCuerpo";

export class ImagenCuerpo extends ParteCuerpo{
    
    private bytes:string; //Verificar que tenga los valores de un byte

    constructor(bytes:string){
        super(TipoParteCuerpo.Imagen);
        this.bytes = bytes;
    }

    public equals(other: ImagenCuerpo): boolean{
        if (this.bytes == other.bytes)
            return true;
        else
            return false;
    }

    public getParteSnapshot(): ImagenSnapshot {
        const constructor:ConstructorImagenCuerpo = new ConstructorImagenCuerpo();
        return constructor.newSnapshot(this.bytes);
    }
}