import { EliminarNotaComando } from "../eliminar_Nota/EliminarNotaComando";
import { EliminarNota} from "../eliminar_Nota/EliminarNota";
import { MongoNotaAdapter } from "../../infraestructure/repositories_adapter/MongoNotaAdapter";
import { Model } from "mongoose";
import { ModificarNota } from "../modificar_Nota/ModificarNota";
import { Optional } from "../../../Shared/utilities/Optional";
import { ModificarNotaComando } from "../modificar_Nota/ModificarNotaComando";
import { ReceptorParteCuerpo } from "../../domain/fabrics/Shared_ParteCuerpo/ReceptorParteCuerpo"

it('test_modify_note_with_all_fields', async () => {
    const repositorio = new MongoNotaAdapter(Model);
    const modificarNota = new ModificarNota(repositorio);
    const id = 'ef025271-0c68-47c2-8b2c-67d49d29c4ea';
    const fechaActualizacion = new Date();
    const titulo = new Optional('new title');
    const cuerpo = new Optional([new ReceptorParteCuerpo("jojo")]);
    const fechaEliminacion = new Optional(new Date());
    const latitud = new Optional(1.0);
    const altitud = new Optional(1.0);
    const usuarioId = '1';
    const cmd = new ModificarNotaComando(id, fechaActualizacion, titulo, cuerpo, fechaEliminacion, latitud, altitud, usuarioId);
    const result = await modificarNota.execute(cmd);
    expect(result.isLeft()).toBe(true);
});