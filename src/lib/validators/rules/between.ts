import { min } from './min';
import { max } from './max';

export async function between(value: any, ...args: any): Promise<boolean> {
    if (args.length !== 2) {
        throw new Error('Invalid number of arguments passed into between validator.');
    }

    return await min(value, args[0]) && await max(value, args[1]);
}