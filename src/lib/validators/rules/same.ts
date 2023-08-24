export function same(value: any, ...args: any): Promise<boolean> {
    return new Promise(resolve => {
        return resolve(value === args[0]);
    });
}