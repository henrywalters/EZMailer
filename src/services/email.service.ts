import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Cron, Interval } from "@nestjs/schedule";
import Handlebars from "handlebars";
import { getPriority } from "os";
import { EmailRequest, EmailStatus } from "src/entities/emailRequest.entity";
import { Sender } from "src/entities/sender.entity";
import { WebHook, WebHookType } from "src/entities/webhook.entity";
const nodemailer = require('nodemailer');

const MAX_ATTEMPTS = 3;

@Injectable()
export class EmailService {

    constructor(private readonly http: HttpService) {}

    public buildEmailString(name: string, email: string) {
        return `"${name}" <${email}>`;
    }

    public compile(text: string) {
        return Handlebars.compile(text);
    }

    public load(template: any, context: any) {
        return template(context);
    }

    @Interval(process.env.EMAIL_DELAY ? parseInt(process.env.EMAIL_DELAY) : 5000)
    public async processEmailRequests() {
        const requests = await EmailRequest.find({where: {status: EmailStatus.Pending}, relations: ['sender', 'sender.domain']});
        for (const request of requests) {
            request.attempts++;
            try {
                await this.send(request);
                request.status = EmailStatus.Sent;
                console.log("Email sent to: " + request.to);
            } catch (e) {
                console.log("Email to send to: " + request.to + ". Attempt number: " + request.attempts)
                if (request.attempts == MAX_ATTEMPTS) {
                    console.log("Marked as rejected");
                    request.status = EmailStatus.Rejected;
                }
            }
            await request.save();
        }
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

        const transportReq = {
            from: this.buildEmailString(req.sender.name, req.sender.email + '@' + req.sender.domain.domain),
            to: req.to,
            cc: req.cc,
            bcc: req.bcc,
            subject: req.subject,
            html: req.body,
            priority: req.priority,
        };

        const info = await transporter.sendMail(transportReq);

        await this.processWebHooks(WebHookType.EmailSent, req)

        // TODO: add some metric whether this actually went trough or not
    }

    public async processWebHooks(type: WebHookType, email: EmailRequest) {
        const webhooks = await WebHook.find({
            where: {
                type,
                active: true
            }
        });

        for (const webhook of webhooks) {
            if (webhook.domain && webhook.domain.id !== email.sender.domain.id) {
                continue;
            }

            if (webhook.sender && webhook.sender.id !== email.sender.id) {
                continue;
            }

            await this.http.post(webhook.endpoint, {
                timestamp: (new Date()).toISOString(),
                type,
                email,
            });
        }
    }
}