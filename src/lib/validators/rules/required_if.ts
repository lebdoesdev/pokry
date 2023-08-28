import { required } from "./required";

export function required_if(value: any, ...args: any): Promise<boolean> {
    return new Promise(resolve => {
        const [_, currentValue, anticipatedValue] = args;

        if ([undefined, null, ''].includes(currentValue)) {
            return resolve(true);
        }

        if (typeof currentValue === 'string' && typeof anticipatedValue === 'string') {
            // Convert to lowercase for matching.
            
            if (currentValue.toLocaleLowerCase() !== anticipatedValue.toLocaleLowerCase()) {
                return resolve(true);
            }

            return resolve(required(value));
        } 

        if (currentValue !== anticipatedValue) {
            return resolve(true);
        }

        return resolve(required(value));
    });
}