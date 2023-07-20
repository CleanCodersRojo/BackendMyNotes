import { Model } from "mongoose";
import { Either } from "src/Shared/utilities/Either";
import { MongoNotaAdapter } from "../infraestructure/repositories_adapter/MongoNotaAdapter";
import { EliminarNota } from "../application/eliminar_Nota/EliminarNota";
import { EliminarNotaComando } from "../application/eliminar_Nota/EliminarNotaComando";
/*test('test_happy_path_eliminar_nota', async () => {
    const repositorio = new MongoNotaAdapter(Model);
    const eliminarNota = new EliminarNota(repositorio);
    const id = "ef025271-0c68-47c2-8b2c-67d49d29c4ea";
    const fechaEliminacion = new Date();
    const usuarioId = 'user1';
    const cmd = new EliminarNotaComando(id, fechaEliminacion, usuarioId);
    const result = await eliminarNota.execute(cmd);
    console.log(result)
    expect(result.isLeft()).toBe(true);
    expect(result.getLeft().notaId).toBe(id);
}); */
/* 

it('test_note_not_found', async () => {
    const repositorio = new MongoNotaAdapter(Model);
        const eliminarNota = new EliminarNota(repositorio);
        const id = 'invalid_id';
        const fechaEliminacion = new Date();
        const usuarioId = 'user1';
        const cmd = new EliminarNotaComando(id, fechaEliminacion, usuarioId);
        const result = await eliminarNota.execute(cmd);
        expect(result.isRight()).toBe(true);
    });  */