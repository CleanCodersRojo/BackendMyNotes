import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { notasSchema} from './Note/infraestructure/schemas/nota.schema';
import { Nota } from './Note/domain/Nota';
import { NotaController } from './Note/infraestructure/nota-controler/nota.controller';
import { MongoNotaAdapter } from './Note/infraestructure/repositories_adapter/MongoNotaAdapter';
import { UserController } from './User/infraestructure/user/user.controller';
import { MongoUserRepository } from './User/infraestructure/user/repository/mongo-user-repository';
import { User } from './User/domain/User';
import { userSchema } from './User/infraestructure/schemas/userModel';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://hanchoel16:123h@cluster0.hwhtx8l.mongodb.net/nota?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{name:Nota.name,
    schema:notasSchema
    },{name:User.name,
    schema:userSchema
    }]),
  ],
  controllers: [NotaController,UserController],
  providers: [MongoNotaAdapter],
})
export class AppModule {}
