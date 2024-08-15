import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({versionKey: false, timestamps: {createdAt: true}})
export class Place {
  @Prop()
  name: string;
  @Prop()
  type: string;
  @Prop()
  address: string;

  @Prop()
  id: string;

  @Prop()
  createdAt: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;
}
export const PlaceSchema = SchemaFactory.createForClass(Place);
