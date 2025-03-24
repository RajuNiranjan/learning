import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  profilePictrue: string;
}

export const UserModel = SchemaFactory.createForClass(User);
