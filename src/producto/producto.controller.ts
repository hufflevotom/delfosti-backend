import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { constantes } from 'src/utils/constantes';
import { pathFile } from 'src/utils/pathFile';
import { customResponse } from 'src/utils/response';
import { CreateProductoDto } from './dto/create-producto.dto';
import { ImagenProductoDto } from './dto/producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductoService } from './producto.service';

@ApiTags('Producto')
@Controller('producto')
export class ProductoController {
  constructor(private readonly service: ProductoService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los productos',
  })
  async index() {
    const model = await this.service.findAll();
    return customResponse('Productos', model);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un producto por id',
  })
  async find(@Param('id') id: string) {
    const model = await this.service.findOne(id);
    return customResponse('Producto', model);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un producto',
  })
  async create(@Body() createProductoDto: CreateProductoDto) {
    const model = await this.service.create(createProductoDto);
    return customResponse('Producto creado', model, 201);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un producto',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    const model = await this.service.update(id, updateProductoDto);
    return customResponse('Producto actualizado', model);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un producto',
  })
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  @Put('/imagen/:id/')
  @ApiOperation({ summary: 'Subir imagen' })
  @ApiConsumes('multipart/form-data')
  // 'imagen', { dest: constantes.pathFile + 'imagenAvio' }
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'imagen', maxCount: 1 }], {
      dest: constantes.pathFile + 'producto',
    }),
  )
  @ApiBody({ type: ImagenProductoDto })
  async uploadImage(
    @Param('id') id: string,
    @UploadedFiles() files: { imagen?: Express.Multer.File },
  ) {
    if (files) {
      const model = await this.service.findOne(id);

      let pathImg = '';

      if (files.imagen) {
        pathImg = pathFile(files.imagen[0]);
        model.imagen = pathImg;
      }

      if (model) {
        await this.service.update(id, model);
        let response = {};
        const resImg = pathImg !== '' ? { imagen: pathImg } : {};
        response = Object.assign(resImg);

        return customResponse('Imagen subida', response);
      }
      throw new NotFoundException('No se encontraron coincidencias');
    } else {
      throw new NotFoundException('Se necesita al menos un archivo');
    }
  }
}
