import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { ProductoSchema } from './schemas/producto.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [ProductoService],
  controllers: [ProductoController],
  imports: [
    MongooseModule.forFeature([{ name: 'Producto', schema: ProductoSchema }]),
  ],
})
export class ProductoModule {}
