import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { notasSchema} from './Note/infraestructure/schemas/nota.schema';
import { Nota } from './Note/domain/Nota';
import { NotaController } from './Note/infraestructure/nota-controler/nota.controller';
import { MongoNotaAdapter } from './Note/infraestructure/repositories_adapter/MongoNotaAdapter';

@Module({
  imports: [
   MongooseModule.forRoot('mongodb+srv://hanchoel16:123h@cluster0.hwhtx8l.mongodb.net/nota?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{name:Nota.name,
    schema:notasSchema
   }])
  ],
  controllers: [NotaController],
  providers: [MongoNotaAdapter],
})
export class AppModule {}
