import { Injectable } from "@nestjs/common";
import Handlebars from "handlebars";
import { EmailRequest } from "src/entities/emailRequest.entity";
const nodemailer = require('nodemailer');

@Injectable()
export class EmailService {

    public buildEmailString(name: string, email: string) {
        return `"${name}" <${email}>`;
    }

    public compile(text: string) {
        return Handlebars.compile(text);
    }

    public load(template: any, context: any) {
        return template(context);
    }

    public async send(req: EmailRequest) {

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        const info = await transporter.sendMail({
            from: this.buildEmailString(req.sender.name, req.sender.email + '@' + req.sender.domain.domain),
            to: req.to,
            cc: req.cc,
            bcc: req.bcc,
            subject: req.subject,
            html: req.body,
        });

        console.log(info);
    }
}