import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Domain, DomainDto } from "src/entities/domain.entity";
import { EmailRequest } from "src/entities/emailRequest.entity";
import { Sender } from "src/entities/sender.entity";
import { AuthGuard } from "src/services/auth.guard";

@Controller("domains")
export class DomainController {

    @Get()
    @UseGuards(AuthGuard)
    public async getDomains() {
        return await Domain.find();
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    public async getDomain(@Param("id") id: string) {
        return await Domain.findOneOrFail(id);
    }

    @Get(":id/senders")
    @UseGuards(AuthGuard)
    public async getSenders(@Param("id") id: string) {
        return await Sender.find({where: {domain: {id}}, relations: ['domain']});
    }

    @Get(":id/emails")
    @UseGuards(AuthGuard)
    public async getEmails(@Param("id") id: string) {
        return await EmailRequest.find({
            where: {
                sender: {
                    domain: {
                        id
                    }
                }
            },
            relations: [
                'sender',
                'sender.domain',
            ]
        });
    }

    @Post()
    @UseGuards(AuthGuard)
    public async createDomain(@Body() req: DomainDto) {
        const domain = new Domain();
        domain.domain = req.domain;
        await domain.save();
        return domain;
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    public async updateDomain(@Param("id") id: string, @Body() req: DomainDto) {
        const domain = await Domain.findOneOrFail(id);
        domain.domain = req.domain;
        await domain.save();
        return domain;
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    public async removeDomain(@Param("id") id: string) {
        const domain = await Domain.findOneOrFail(id);
        await domain.remove();
    }
}