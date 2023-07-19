import { Optional } from "src/Shared/utilities/Optional";
import { CrearNotaComando } from "../application/crear_Nota/CrearNotaComando";
import { ReceptorTextoCuerpo } from "../domain/fabrics/FabricaTexto/ReceptorTextoCuerpo";
import { ConstructorTextoPlanoCuerpo } from "../domain/fabrics/FabricaTexto/ConstructorTextoPlanoCuerpo";
import { ReceptorParteCuerpo } from "../domain/fabrics/Shared_ParteCuerpo/ReceptorParteCuerpo";
import { ReceptorImagenCuerpo } from "../domain/fabrics/FabricaImagen/ReceptorImagenCuerpo";

export class NoteObjectMother {
    static createDummyCMD(): CrearNotaComando {
        let text1:ReceptorTextoCuerpo = {tipo:"Texto Plano", texto:"dummy text test"};
        let img1:ReceptorImagenCuerpo = {tipo:"Imagen", url:"dummy url test"};
        const cmd: CrearNotaComando = new CrearNotaComando(
            "dummy title", [text1,img1], new Date(), new Optional<Date>(),  new Date(), new Optional<number>(10.141), new Optional<number>(20.141), "dummy User"
        )
        return cmd;
    }

    static createEmptyCMD(): CrearNotaComando {
        const cmd: CrearNotaComando = new CrearNotaComando(
            undefined, undefined, undefined, undefined,  undefined, undefined, undefined, "dummy User"
        )
        return cmd;
    }
}