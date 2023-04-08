import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";


import { ProductsService } from "./products.service";

@Controller('products')
export class ProdcutsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {

        const generatedId = this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice
        );
        return {id:generatedId}
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return products.map(prod => ({
            id:prod.id,
            title:prod.title,
            description:prod.description,
            price:prod.price
        }));
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string,) {
        await this.productsService.deleteProduct(prodId);
        return null;
    }

    @Patch(':id')
    async updateProduct(@Param('id') prodId: string, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number,) {
        await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string,) {
        return this.productsService.getSingleProduct(prodId)
    }

}

