import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Domain } from "src/entities/domain.entity";
import { Sender } from "src/entities/sender.entity";
import { WebHook, WebHookDto } from "src/entities/webhook.entity";
import { AuthGuard } from "src/services/auth.guard";

@Controller('webhooks')
export class WebHookController {
    @Get()
    @UseGuards(AuthGuard)
    public async getWebHooks() {
        return await WebHook.find({
            where: {
                active: true
            }
        })
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    public async getWebHook(@Param("id") id: string) {
        return await WebHook.findOne({
            where: {
                active: true,
                id,
            }
        })
    }

    @Post()
    @UseGuards(AuthGuard)
    public async createWebHook(@Body() req: WebHookDto) {
        const webhook = new WebHook();
        webhook.type = req.type;
        webhook.endpoint = req.endpoint;
        webhook.domain = req.domainId ? await Domain.findOneOrFail(req.domainId) : null;
        webhook.sender = req.senderId ? await Sender.findOneOrFail(req.senderId) : null;
        await webhook.save();
        return webhook;
    }

    @Post("test")
    public async testWebHook(@Req() req) {
        console.log("WebHook called here!")
        console.log(req.body);
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    public async updateWebHook(@Param("id") id: string, @Body() req: WebHookDto) {
        const webhook = await WebHook.findOneOrFail(id);
        webhook.type = req.type;
        webhook.endpoint = req.endpoint;
        webhook.domain = req.domainId ? await Domain.findOneOrFail(req.domainId) : null;
        webhook.sender = req.senderId ? await Sender.findOneOrFail(req.senderId) : null;
        await webhook.save();
        return webhook;
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    public async deleteWebHook(@Param("id") id: string) {
        const webhook = await WebHook.findOneOrFail(id);
        await webhook.remove();
        return void 0;
    }
}