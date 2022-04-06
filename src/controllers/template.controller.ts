import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query } from "@nestjs/common";
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

    @Get(":name")
    public async getVersionedTemplate(@Param("name") name: string, @Query("v") version: number) {
        console.log(name, version);
        return await Template.findOneOrFail({
            where: {
                name,
                version,
            }
        })
    }

    @Post()
    public async createTemplate(@Body() req: TemplateDto) {

        if (await Template.findOne({where: {name: req.name}})) {
            throw new HttpException("Template with this name already exists. Please duplicate to create a new version", 400);
        }

        const template = new Template();
        template.body = req.body;
        template.name = req.name;
        await template.save();
        return template;
    }

    @Post(":id/duplicate")
    public async duplicateTemplate(@Param("id") id: string) {
        const template = await Template.findOneOrFail(id);
        const templateCopy = new Template();
        templateCopy.body = template.body;
        templateCopy.name = template.name;
        templateCopy.version = template.version + 1;
        await templateCopy.save();
        return templateCopy;
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