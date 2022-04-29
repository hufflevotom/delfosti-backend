/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class ProductoDto {
  @ApiProperty()
  codigo: string;
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  descripcion?: string;
  @ApiProperty()
  precio: number;
}

export class ImagenProductoDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  imagen: any;
}
