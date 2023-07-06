import { IValueObject } from "src/Shared/domain/IValueObject";
import { TipoParteCuerpo } from "./TipoParteCuerpo";
import { ParteCuerpo } from "./ParteCuerpo";
import { EnumAlineacionTexto } from "./EnumAlineacionTexto";
import { ImagenSnapshot } from "../../Snapshot/ImagenSnapshot";
import { ConstructorImagenCuerpo } from "../../fabrics/FabricaImagen/ConstructorImagenCuerpo";

export class ImagenCuerpo extends ParteCuerpo{
    
    private bytes:Uint8Array; //Verificar que tenga los valores de un byte

    constructor(bytes:Uint8Array){
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