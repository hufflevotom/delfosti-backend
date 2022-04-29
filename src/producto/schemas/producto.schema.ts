/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductoDocument = Producto & Document;

@Schema()
export class Producto {
  @Prop({ required: true })
  codigo: string;

  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion?: string;

  @Prop({ required: true })
  precio: number;

  @Prop()
  imagen?: string;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
