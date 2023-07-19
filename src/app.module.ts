import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { notasSchema} from './Note/infraestructure/schemas/nota.schema';
import { Nota } from './Note/domain/Nota';
import { NotaController } from './Note/infraestructure/nota-controler/nota.controller';
import { MongoNotaAdapter } from './Note/infraestructure/repositories_adapter/MongoNotaAdapter';
import { logsSchema } from './Note/infraestructure/schemas/log.schema';
import { MongoLogAdapter } from './Note/infraestructure/_decoradores_adapter/MongoLogAdapter';

@Module({
  imports: [
   MongooseModule.forRoot('mongodb+srv://hanchoel16:123h@cluster0.hwhtx8l.mongodb.net/nota?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{name:Nota.name,
    schema:notasSchema
   }]),MongooseModule.forFeature([{name:"Log",
    schema:logsSchema
   }])
  ],
  controllers: [NotaController],
  providers: [MongoNotaAdapter, MongoLogAdapter],
})
export class AppModule {}
