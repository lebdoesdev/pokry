export function pattern(value: any, ...args: any): Promise<boolean> {
    const regex = new RegExp(args[0]);

    // TODO: Pattern isn't working properly and isn't matching.

    return new Promise(resolve => {
         return resolve(value && regex.test(value));
    })
}