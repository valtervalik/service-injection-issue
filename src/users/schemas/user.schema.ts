import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from './role.schema';
import { Permission } from './permission.schema';
import { BaseSchema } from 'src/base/base.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends BaseSchema {
  @Prop({ type: String })
  username: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true, unique: true })
  phone: string;

  @Prop({ type: String, select: false })
  password?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;

  @Prop({ type: Boolean, default: false })
  isTFAEnabled: boolean;

  @Prop({ type: String })
  tfaSecret?: string;

  @Prop({ type: String })
  googleId?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' })
  permission: Permission;
}

export const UserSchema = SchemaFactory.createForClass(User);
