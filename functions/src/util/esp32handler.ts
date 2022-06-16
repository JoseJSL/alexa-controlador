import fetch from 'node-fetch';

export async function alertPIN(pin: number, operation: 'on' | 'off'): Promise<boolean>{
    if(await callClient(pin, operation)){
        return true;
    } else {
        throw new Error('client not available');
    }
}

export async function callClient(pin: number, operation: 'on' | 'off'): Promise<boolean>{
    return new Promise((resolve, reject) => {
        fetch(
            `http://189.252.191.151/${pin}/${operation}`, { 
                method: 'GET', 
                headers: { get: `GET /${pin}/${operation}` },
                timeout: 5000,
            }
        )
        .then(ok => resolve(true))
        .catch(err => resolve(false));
    });
}