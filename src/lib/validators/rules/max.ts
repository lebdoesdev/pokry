export function max(value: any, ...args: any): Promise<boolean> {
    if (args.length !== 1) {
        throw new Error('Invalid number of arguments passed into max validator.');
    }

    return new Promise(resolve => {
        const maximum = parseInt(args[0]);

        if (value instanceof File) {
            return resolve(value.size <= maximum);
        }

        if (typeof value === 'string' || Array.isArray(value)) {
            return resolve(value.length <= maximum);
        }

        if (typeof value === 'object') {
            return resolve(Object.keys(value).length <= maximum);
        }

        if (typeof value === 'number') {
            return resolve(value <= maximum);
        }

        return resolve(true);
    });
}