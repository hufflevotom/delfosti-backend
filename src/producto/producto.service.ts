import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto, ProductoDocument } from './schemas/producto.schema';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel(Producto.name)
    private readonly model: Model<ProductoDocument>,
  ) {}

  async findAll(): Promise<Producto[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Producto> {
    return await this.model.findById(id).exec();
  }

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    return await new this.model({
      ...createProductoDto,
      createdAt: new Date(),
    }).save();
  }

  async update(
    id: string,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    return await this.model.findByIdAndUpdate(id, updateProductoDto).exec();
  }

  async delete(id: string): Promise<Producto> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
