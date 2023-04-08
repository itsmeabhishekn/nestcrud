import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import {NotFoundException} from '@nestjs/common'
import { Product } from "./product.model";
import { InjectModel } from "@nestjs/mongoose/dist/common";
import { Model} from 'mongoose';

@Injectable()
export class ProductsService{

    private products:Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel :Model<Product> ) {}

    async insertProduct(title:string,desc:string,price:number) {
        /* const prodId = Math.random().toString(); */
        const newProduct = new this.productModel({
            title,
            description:desc,
            price
        })
        const result = await  newProduct.save()
        console.log(result);
        return result.id as string;
    }


async getProducts(){
    const products = await this.productModel.find().exec(); 
    return products;
}

async getSingleProduct(productId:string){
    const product = await this.findProduct(productId);
    return {id:product.id,title:product.title,description:product.description,price:product.price};
}


async updateProduct(productId:string,title:string,desc:string,price:number){
    const updatedProduct = await this.findProduct(productId);
    console.log(updatedProduct);

    if(title){
        updatedProduct.title= title;
    }

    if(desc){
        updatedProduct.description = desc;
    }

    if(price){
        updatedProduct.price=price;
    }
    updatedProduct.save();
    console.log("patched");
}


private async findProduct(id:string) :Promise<Product>{
    let product;
    try {
         product = await this.productModel.findById(id).exec();
    }
    catch(error){
        throw new NotFoundException('could not find product')
    }
    
    if(!product)
    {
        throw new NotFoundException('could not find product')
    }
    return product;
}

async deleteProduct(prodId:string){
    const result = await this.productModel.deleteOne({_id:prodId}).exec();
    if(result.deletedCount===0){
        throw new NotFoundException("could not find the product")
    }
}

}