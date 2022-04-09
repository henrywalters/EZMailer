import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { ApiKey } from "src/entities/apiKey.entity";

const GENERIC_ERROR = "API Access requires proper authentication";

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const die = () => { throw new ForbiddenException(GENERIC_ERROR); }
        const request = context.switchToHttp().getRequest();

        if (!('authorization' in request.headers)) {
            die();
        }

        const authToken = request.headers.authorization;
        const parsed = Buffer.from(authToken, 'base64').toString('ascii');
        const parts = parsed.split('.');

        if (parts.length !== 2) {
            die();
        }

        const apiKey = await ApiKey.findOne({where:{name: parts[0], active: true}});

        if (!apiKey) {
            console.log("Key doesn't exist");
            die();
        }

        const match = await bcrypt.compare(parts[1], apiKey.key);

        if (!match) {
            console.log("Key didnt match");
            die();
        }

        return request;
    }
}