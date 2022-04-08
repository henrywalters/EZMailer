import { Controller, Get, Param, Res } from "@nestjs/common";
import * as Jimp from 'jimp';

@Controller("tracking")
export class TrackingController {
    @Get(":id")
    public async getTrackingImage(@Param("id") id: string, @Res() response) {
        console.log("TRACKING " + id);

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