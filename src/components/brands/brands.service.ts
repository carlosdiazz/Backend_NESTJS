import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from './brands.entity';
import { CreateBrandSchema, UpdateBrandSchemas } from './brands.dto';
@Injectable()
export class BrandsService {

    constructor(
        @InjectRepository(Brand) private brandRepo: Repository<Brand>
    ) {}

    findAll() {
        return this.brandRepo.find();
    }

    async findOne(id: number) {
        const brand = await this.brandRepo.findOneBy({ id })
        if (!brand) {
            throw new NotFoundException('No se encontro este Brand');
        }
        return brand;
     }

    create(data: CreateBrandSchema) {
        const newBrand = this.brandRepo.create(data);
        return this.brandRepo.save(newBrand);
     }

    async update(id: number, data: UpdateBrandSchemas) {
        const brand = await this.brandRepo.findOneBy({ id })
        if (!brand) {
            throw new NotFoundException('No se encontro este Brand');
        }
        this.brandRepo.merge(brand, data);
        return this.brandRepo.save(brand)
     }

    async delete(id: number) {
        const brand = await this.brandRepo.findOneBy({ id })
        if (!brand) {
            throw new NotFoundException('No se encontro este Brand');
        }
        return this.brandRepo.delete(id);
    }

}
