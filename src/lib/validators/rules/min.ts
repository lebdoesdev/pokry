export function min(value: any, ...args: any): Promise<boolean> {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments passed into min validator.');
    }

    return new Promise(resolve => {
        const minimum = parseInt(args[0]);

        if (value instanceof File) {
            return resolve(value.size >= minimum);
        }

        if (typeof value === 'string' || Array.isArray(value)) {
            return resolve(value.length >= minimum);
        }

        if (typeof value === 'object') {
            return resolve(Object.keys(value).length >= minimum);
        }

        if (typeof value === 'number') {
            return resolve(value >= minimum);
        }

        return resolve(true);
    });
}