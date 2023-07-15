import { IValueObject } from "src/Shared/domain/IValueObject";
import { TipoParteCuerpo } from "./TipoParteCuerpo";
import { ParteCuerpo } from "./ParteCuerpo";
import { EnumAlineacionTexto } from "./EnumAlineacionTexto";
import { ImagenSnapshot } from "../../Snapshot/ImagenSnapshot";
import { ConstructorImagenCuerpo } from "../../fabrics/FabricaImagen/ConstructorImagenCuerpo";

export class ImagenCuerpo extends ParteCuerpo{
    
    private url:string; //Verificar que tenga los valores de un byte

    constructor(url:string){
        super(TipoParteCuerpo.Imagen);
        this.url =url;
    }

    public equals(other: ImagenCuerpo): boolean{
        if (this.url == other.url)
            return true;
        else
            return false;
    }

    public getParteSnapshot(): ImagenSnapshot {
        const constructor:ConstructorImagenCuerpo = new ConstructorImagenCuerpo();
        return constructor.newSnapshot(this.url);
    }
}