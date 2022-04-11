import { Random } from "hcore/dist/random";
import { Command, CommandRunner, Option } from "nest-commander";
import { ApiKey } from "src/entities/apiKey.entity";
import * as bcrypt from 'bcrypt';

interface ApiKeyOptions {
    length?: number;
}

interface ApiKeyCommandOptions {
    alias: string;
    func: (caller: ApiKeyCommand, args: string[], options?: ApiKeyOptions) => Promise<void>;
}

const ERROR_COLOR = "\x1b[31m";
const DEFAULT_LENGTH = 128;

@Command({name:'api-key', description: 'CLI tool for generating and removing API keys'})
export class ApiKeyCommand implements CommandRunner {

    private commands: {[key: string]: ApiKeyCommandOptions} = {
        generate: {
            alias: 'g',
            func: this.generateApiKey,
        },
        remove: {
            alias: 'r',
            func: this.removeApiKey,
        }
    }

    async run(passedParams: string[], options?: ApiKeyOptions): Promise<void> {

        const commandNames = Object.keys(this.commands);
        const commandAliases = commandNames.map((key) => this.commands[key].alias);

        if (passedParams.length === 0 || !(commandNames.indexOf(passedParams[0]) !== -1 || commandAliases.indexOf(passedParams[0]) !== -1)) {
            return this.die("Please enter one of the following commands: " + commandNames.join(", "))
        }

        for (const key of commandNames) {
            if (key === passedParams[0] || this.commands[key].alias === passedParams[0]) {
                return this.commands[key].func(this, passedParams, options);
            }
        }

        return void 0;
    }

    @Option({
        flags: '-l, --length [number]',
        description: 'length of the api key'
    })
    parseLength(val: string) {
        return parseInt(val);
    }

    die(message: string) {
        console.log(ERROR_COLOR, message);
        return void 0;
    }

    async generateApiKey(caller: ApiKeyCommand, args: string[], options: ApiKeyOptions) {

        const keyName = args[1];

        if (!!(await ApiKey.findOne({where: {name: keyName, active: true}}))) {
            return caller.die(`Api Key: '${keyName}' already exists`);
        }

        const key = Random.alphanumericNonAmbig(options.length ? options.length : 36);

        const apiKey = new ApiKey();
        apiKey.key = await bcrypt.hash(key, await bcrypt.genSalt());
        apiKey.name = keyName;
        await apiKey.save();

        const pubkey = Buffer.from(`${apiKey.name}.${key}`).toString('base64');

        console.log(`API Key '${apiKey.name}' created succesfully`);

        console.log(pubkey);

    }

    async removeApiKey(caller: ApiKeyCommand, args: string[], options: ApiKeyOptions) {
        const keyName = args[1];
        const key = await ApiKey.findOne({where: {name: keyName, active: true}});
        if (!key) {
            return caller.die(`Api Key: '${keyName}' does not exist`);
        }

        key.active = false;
        await key.save();

        console.log(`API Key '${keyName}' removed`);
    }
    
}