import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), ProductoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
