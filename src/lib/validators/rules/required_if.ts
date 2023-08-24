import { required } from "./required";

export function required_if(value: any, ...args: any): Promise<boolean> {
    return new Promise(resolve => {
        if (args[0] === undefined || args[0] === null || args[0] === '') {
            return resolve(true);
        }

        if (args[0] !== args[1]) {
            return resolve(true);
        }

        return resolve(required(value));
    });
}