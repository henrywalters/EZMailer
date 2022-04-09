import { Random } from "hcore/dist/random";
import { Command, CommandRunner, Option } from "nest-commander";
import { ApiKey } from "src/entities/apiKey.entity";
import * as bcrypt from 'bcrypt';

interface GenerateApiKeyOptions {
    length?: number;
}

const ERROR_COLOR = "\x1b[31m";
const DEFAULT_LENGTH = 128;

@Command({name:'generate-api-key', description: 'Generate a new API key to be used by a client'})
export class GenerateApiKeyCommand implements CommandRunner {
    async run(passedParams: string[], options?: GenerateApiKeyOptions): Promise<void> {
        if (passedParams.length !== 1) {
            console.log(ERROR_COLOR, "Name argument required to generate API Key");
            return void 0;
        }

        if (!!(await ApiKey.findOne({where: {name: passedParams[0], active: true}}))) {
            console.log(ERROR_COLOR, "API Key with this name already exists");
            return void 0;
        }

        const key = Random.alphanumericNonAmbig(options.length ? options.length : 36);

        const apiKey = new ApiKey();
        apiKey.key = await bcrypt.hash(key, await bcrypt.genSalt());
        apiKey.name = passedParams[0];
        await apiKey.save();

        const pubkey = Buffer.from(`${apiKey.name}.${key}`).toString('base64');

        console.log(`API Key '${apiKey.name}' created succesfully`);

        console.log(pubkey);

        return void 0;
    }

    @Option({
        flags: '-l, --length [number]',
        description: 'length of the api key'
    })
    parseLength(val: string) {
        return parseInt(val);
    }
    
}