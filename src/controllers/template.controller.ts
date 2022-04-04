import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Template, TemplateDto } from "src/entities/template.entity";

@Controller("templates")
export class TemplateController {
    @Get()
    public async getTemplates() {
        return await Template.find();
    }   

    @Get(":id")
    public async getTemplate(@Param("id") id: string) {
        return await Template.findOneOrFail(id);
    }

    @Post()
    public async createTemplate(@Body() req: TemplateDto) {
        const template = new Template();
        template.body = req.body;
        await template.save();
        return template;
    }

    @Put(":id")
    public async updateTemplate(@Param("id") id: string, @Body() req: TemplateDto) {
        const template = await Template.findOneOrFail(id);
        template.body = req.body;
        await template.save();
        return template;
    }

    @Delete(":id")
    public async removeTemplate(@Param("id") id: string) {
        const template = await Template.findOneOrFail(id);
        await template.remove();
    }
}