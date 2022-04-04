import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Domain, DomainDto } from "src/entities/domain.entity";

@Controller("domains")
export class DomainController {
    @Get()
    public async getDomains() {
        return await Domain.find();
    }

    @Get(":id")
    public async getDomain(@Param("id") id: string) {
        return await Domain.findOneOrFail(id);
    }

    @Post()
    public async createDomain(@Body() req: DomainDto) {
        const domain = new Domain();
        domain.domain = req.domain;
        await domain.save();
        return domain;
    }

    @Put(":id")
    public async updateDomain(@Param("id") id: string, @Body() req: DomainDto) {
        const domain = await Domain.findOneOrFail(id);
        domain.domain = req.domain;
        await domain.save();
        return domain;
    }

    @Delete(":id")
    public async removeDomain(@Param("id") id: string) {
        const domain = await Domain.findOneOrFail(id);
        await domain.remove();
    }
}