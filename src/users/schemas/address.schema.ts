import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/base/base.schema';
import { User } from 'src/users/schemas/user.schema';

export type AddressDocument = HydratedDocument<Address>;

@Schema({ timestamps: true })
export class Address extends BaseSchema {
  @Prop({ type: String })
  addressLine1: string;

  @Prop({ type: String })
  addressLine2: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  state: string;

  @Prop({ type: String })
  zip: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
