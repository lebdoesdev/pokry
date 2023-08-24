export function email(value: any, ...args: any): Promise<boolean> {
    const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

    return new Promise(resolve => {
         return resolve(value && emailRegex.test(value));
    })
}