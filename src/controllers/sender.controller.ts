import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Domain } from "src/entities/domain.entity";
import { EmailRequest } from "src/entities/emailRequest.entity";
import { Sender, SenderDto } from "src/entities/sender.entity";
import { AuthGuard } from "src/services/auth.guard";

@Controller("senders")
export class SenderController {
    @Get()
    @UseGuards(AuthGuard)
    public async getSenders() {
        return await Sender.find({relations: ['domain']});
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    public async getSender(@Param("id") id: string) {
        return await Sender.findOneOrFail(id, {relations: ['domain']});
    }

    @Get(":id/emails")
    @UseGuards(AuthGuard)
    public async getEmails(@Param("id") id: string) {
        return await EmailRequest.find({
            where: {
                sender: {id}
            },
            relations: [
                'sender',
                'sender.domain',
            ]
        });
    }

    @Post()
    @UseGuards(AuthGuard)
    public async createSender(@Body() req: SenderDto) {
        const sender = new Sender();
        sender.domain = await Domain.findOneOrFail(req.domainId);
        sender.name = req.name;
        sender.email = req.email;
        await sender.save();
        return sender;
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    public async updateSender(@Param("id") id: string, @Body() req: SenderDto) {
        const sender = await Sender.findOneOrFail(id);
        sender.domain = await Domain.findOneOrFail(req.domainId);
        sender.name = req.name;
        sender.email = req.email;
        await sender.save();
        return sender;
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    public async removeSender(@Param("id") id: string) {
        const sender = await Sender.findOneOrFail(id);
        await sender.remove();
    }
}