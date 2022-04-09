import { Controller, Get, Param, Res } from "@nestjs/common";
import * as Jimp from 'jimp';
import { EmailRequest } from "src/entities/emailRequest.entity";
import { WebHookType } from "src/entities/webhook.entity";
import { EmailService } from "src/services/email.service";

@Controller("tracking")
export class TrackingController {

    constructor(private readonly emails: EmailService) {}

    @Get(":id")
    public async getTrackingImage(@Param("id") id: string, @Res() response) {
        console.log("TRACKING " + id);

        const email = await EmailRequest.findOne(id);

        if (email) {
            const timestamp = new Date();
            if (!email.firstOpenedAt) {
                email.firstOpenedAt = timestamp;
            }
            email.lastOpenedAt = timestamp;
            await email.save();
        }

        await this.emails.processWebHooks(WebHookType.EmailOpened, email);

        // Return a valid 1x1 pixel PNG to spoof email clients

        const image = new Jimp(1, 1, (err, image) => {
            image.setPixelColor(0xFFFFFFFF, 0, 0);
        });

        response.setHeader("content-type", "image/png");
        response.setHeader("content-disposition", id);
        image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
            response.send(buffer);
        })
    }
}