import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/base/base.schema';
import { User } from 'src/users/schemas/user.schema';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ timestamps: true })
export class Permission extends BaseSchema {
  @Prop({ type: Boolean, default: false })
  create_user: boolean;

  @Prop({ type: Boolean, default: false })
  update_user: boolean;

  @Prop({ type: Boolean, default: false })
  delete_user: boolean;
}
export const PermissionSchema = SchemaFactory.createForClass(Permission);
