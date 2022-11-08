import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from './products.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Product, productSchema } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<productSchema>,
  ) {}

  async findAll(params?: FilterProductsDto): Promise<Product[]> {
    const filters: FilterQuery<Product> = {};
    const {
      limit = 5,
      offset = 0,
      minPrice = 0,
      maxPrice = 9999999999,
    } = params;
    if (minPrice && maxPrice) {
      filters.price = { $gte: minPrice, $lte: maxPrice };
    }
    return await this.productModel
      .find(filters)
      .skip(offset * limit)
      .limit(limit)
      .exec();
  }

  //async findAll(params?: FilterProductsDto) {
  //  const { limit = 5, offset = 0 } = params;
  //  const [total, products] = await Promise.all([
  //    this.productModel.countDocuments(),
  //    this.productModel
  //      .find()
  //      .skip(offset * limit)
  //      .limit(limit)
  //      .exec(),
  //  ]);
  //  return { total, products };
  //}

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('No se encontro este producto');
    }
    return product;
  }

  async create(data: CreateProductDto) {
    try {
      const newProduct = new this.productModel(data);
      return await newProduct.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, data: UpdateProductDto) {
    await this.findOne(id);
    return await this.productModel
      .findByIdAndUpdate(id, { $set: data }, { new: true }) //con set solo modifico lo cambio
      .exec();
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.productModel.findByIdAndDelete(id);
  }
}
