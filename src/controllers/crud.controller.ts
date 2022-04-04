import { Body, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BaseEntity, getConnection, Repository, EntityTarget } from "typeorm";

export class CrudController<T extends BaseEntity> {

    private gRepo: Repository<T>;
    
    @Get()
    public async get() {
        return await this.gRepo.find();
    }

    @Get(":id")
    public async getOne(@Param("id") id: string) {
        return await this.gRepo.findOneOrFail(id);
    }

    @Post()
    public async create(@Body() req: any) {
        const obj = await this.gRepo.create(req);
        return obj;
    }

    @Put(":id")
    public async update(@Param("id") id: string, @Body() req: any) {
        const obj = await this.gRepo.findOneOrFail(id);
        await obj.save(req);
        return obj;
    }

    @Delete(":id")
    public async remove(@Param("id") id: string) {
        const obj = await this.gRepo.findOneOrFail(id);
        await obj.remove();
    }
}