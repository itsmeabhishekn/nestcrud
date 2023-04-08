import { Module } from "@nestjs/common";
import { ProdcutsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { ProductSchema } from "./product.model";

@Module({
    imports: [MongooseModule.forFeature([{name:'Product',schema:ProductSchema}])],
    controllers: [ProdcutsController],
    providers:[ProductsService]
})

export class ProductsModule{}