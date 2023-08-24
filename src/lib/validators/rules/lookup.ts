export async function lookup(value: any, ...args: any): Promise<boolean> {
    // {endpoint:args[0]},{methods:args[1]},{status}2,{param}3
    if (args.length !== 4) {
        throw new Error('Invalid number of arguments passed into lookup validator');
    }

    const [endpoint, method, status, param] = args;

    const methods = ['GET', 'POST', 'PATCH', 'PUT'];

    if (! methods.includes(method)) {
        throw new Error('Unrecognized http method passed into lookup validator');
    }

    let url = endpoint;

    if (method === 'GET') {
        url += `?${param}=${value}`;
    }

    const response = await fetch(url, {
        method,
        body: ['POST', 'PATCH'].includes(args[1]) ? JSON.stringify({ [args[3]]: value }) : null
    })

    return response.status === args[2];
}