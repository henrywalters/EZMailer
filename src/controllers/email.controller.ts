import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { EmailRequest, EmailRequestDto } from "src/entities/emailRequest.entity";
import { Sender } from "src/entities/sender.entity";
import { Template } from "src/entities/template.entity";
import { AuthGuard } from "src/services/auth.guard";
import { EmailService } from "src/services/email.service";

@Controller("emails")
export class EmailController {

    constructor(private readonly emails: EmailService) {}

    @Get()
    @UseGuards(AuthGuard)
    public async getEmails() {
        return await EmailRequest.find();
    }

    @Post()
    @UseGuards(AuthGuard)
    public async sendEmail(@Body() req: EmailRequestDto, @Req() request) {
        const sender = await Sender.findOneOrFail(req.senderId, {relations: ['domain']});
        const template = await Template.findOneOrFail(req.templateId);
        let email = new EmailRequest();
        email.body = this.emails.load(this.emails.compile(template.body), req.context);
        email.priority = req.priority;
        email.subject = req.subject;
        email.to = req.to; 
        email.cc = req.cc;
        email.bcc = req.bcc;
        email.sender = sender;
        email = await email.save();

        const baseUrl = request.protocol+"://"+request.headers.host;

        email.body += `<img src='${baseUrl}/tracking/${email.id}' />`;

        email = await email.save();

        return await EmailRequest.findOneOrFail(email.id);
    }
}