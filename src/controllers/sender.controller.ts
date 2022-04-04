import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Domain } from "src/entities/domain.entity";
import { Sender, SenderDto } from "src/entities/sender.entity";

@Controller("senders")
export class SenderController {
    @Get()
    public async getSenders() {
        return await Sender.find();
    }

    @Get(":id")
    public async getSender(@Param("id") id: string) {
        return await Sender.findOneOrFail(id);
    }

    @Post()
    public async createSender(@Body() req: SenderDto) {
        const sender = new Sender();
        sender.domain = await Domain.findOneOrFail(req.domainId);
        sender.name = req.name;
        sender.email = req.email;
        await sender.save();
        return sender;
    }

    @Put(":id")
    public async updateSender(@Param("id") id: string, @Body() req: SenderDto) {
        const sender = await Sender.findOneOrFail(id);
        sender.domain = await Domain.findOneOrFail(req.domainId);
        sender.name = req.name;
        sender.email = req.email;
        await sender.save();
        return sender;
    }

    @Delete(":id")
    public async removeSender(@Param("id") id: string) {
        const sender = await Sender.findOneOrFail(id);
        await sender.remove();
    }
}