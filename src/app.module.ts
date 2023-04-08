import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/product.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [ProductsModule,
    MongooseModule.forRoot('mongodb+srv://goku:tXZS2KmpMc8mcveZ@devcon.pmwsv.mongodb.net/?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
