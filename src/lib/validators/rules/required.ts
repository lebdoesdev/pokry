const BLACK_LIST = [
    undefined, null, 'null', 'undefined'
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function required(value: any, ...args: any): Promise<boolean> {
    return new Promise(resolve => {
        if(BLACK_LIST.includes(value) || Number.isNaN(value)) {
            return resolve(false);
        }

        if (typeof value === 'string') {
            return resolve(value.replace(/\s/g, '').length > 0);
        }

        if (typeof value === 'object') {
            return resolve(value.length > 0);
        }

        if (Array.isArray(value)) {
            return resolve(value.length > 0);
        }

        resolve(true);
    })
}