export function url(value: any, ...args: any): Promise<boolean> {
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/g;

    return new Promise(resolve => {
        return resolve(value && urlRegex.test(value));
   })
}