import { required } from "./required";

export function required_if(value: any, ...args: any): Promise<boolean> {
    return new Promise(resolve => {
        const [currentValue, anticipatedValue] = args;

        if ([undefined, null, ''].includes(currentValue)) {
            return resolve(true);
        }

        if (currentValue !== anticipatedValue) {
            return resolve(true);
        }

        return resolve(required(value));
    });
}