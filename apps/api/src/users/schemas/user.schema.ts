import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: false })
  name: string;

  @Prop({ default: 'active', enum: ['active', 'inactive', 'locked'] })
  accountStatus: 'active' | 'inactive' | 'locked';

  @Prop({ default: 0 })
  failedLoginAttempts: number;

  @Prop()
  lastFailedLogin?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
