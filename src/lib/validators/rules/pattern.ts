export function pattern(value: any, ...args: any): Promise<boolean> {
    const regex = new RegExp(args[0]);

    return new Promise(resolve => {
         return resolve(value && regex.test(value));
    })
}