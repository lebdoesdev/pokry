export function mimetype(value: any, ...args: any): Promise<boolean> {
    return new Promise(resolve => {
        if (args.length === 0 || !(value instanceof File)) {
            return resolve(false);
        }

        return resolve(args.includes(value.type));
    })
}