import {Schema,Prop,SchemaFactory} from "@nestjs/mongoose";
import { Document,Model } from "mongoose";

export type UserDocument = UserSchema & Document;

@Schema()
export class UserSchema{
    @Prop({
        unique:true,
        required:true,
    })
    userId:string;

    @Prop({
        unique:true,
        required:true,
        trim:true
    })
    email:string;

   
    @Prop({
        required:true,
    })
    name:string;

    @Prop({
        required:true,
    })
    bornDate:Date;

    @Prop({
        required:true,
    })
    pass:string;


  

}

export const userSchema = SchemaFactory.createForClass(UserSchema);
export type userModel = Model<UserSchema>;