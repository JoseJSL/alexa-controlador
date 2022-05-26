import fetch from 'node-fetch';

export async function alertPIN(pin: number, operation: 'on' | 'off'): Promise<string>{
    const response  = await fetch(`http://189.156.151.105/${pin}/${operation}`, { method: 'GET',
        headers: {get: `GET /${pin}/${operation}`}
    });

    return JSON.stringify(response.json());
}