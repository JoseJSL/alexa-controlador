import { LocationList } from "./devices";

type ErrorMessage = 'location not found' | 'device not found on location' | 'device not found';

export function getErrorSpeech(errorMessage: ErrorMessage): string{
    if(errorMessage === 'device not found'){
        return 'Lo siento, no encontré ningún dispositivo con ése nombre.';
    } else if(errorMessage === 'location not found'){
        return 'Lo siento, no encontré ningún lugar con ése nombre.'
    } else if(errorMessage === 'device not found on location'){
        return 'Lo siento, no encontré ningún dispositivo en ése lugar.';
    }

    return 'Lo siento, no pude entenderte.';
}

export function parsePIN(device: string, location: string, number: string, parse?: 'device' | 'location' | 'both'): number{
    if(parse){
        if(parse === 'both' || parse === 'device'){
            device = parseDevice(device);
        }

        if(parse === 'both' || parse === 'location'){
            location = parseLocation(location, number);
        }
    }

    if(!LocationList[location]){
        throw new Error('location not found');
    } else if(!LocationList[location].Devices[device]){
        throw new Error('device not found on location');
    }

    return LocationList[location].Devices[device].PIN;
}

function parseDevice(device: string): string{
    device = sanitizeString(device);
    if(device === 'luces' || device === 'luz' || device === 'foco' || device === 'focos'){
        return 'luces';
    } else if(device === 'aire' || device === 'aires' || device === 'aire acondicionado' || device === 'aires acondicionado' || device === 'aire acondicionados' || device === 'aires acondicionados'){
        return 'aires acondicionados';
    } else if(device === 'puerta' || device === 'puertas'){
        return 'puertas';
    }

    throw new Error('device not found');
}

function parseLocation(location: string, number: string){
    if(!isOnlyNumbers(number)){
        throw new Error('number not valid');   
    }

    location = sanitizeString(location);

    if(location === 'centro de computo' || location === 'centros de computo' || location === 'centro de computos' || location === 'centro de computador' || location === 'centros de computador'){
        return 'centro de cómputo ' + number;
    } else if(location === 'aula' || location === 'aulas'){
        return 'aula ' + number;
    }

    throw new Error('location not found');
}

function sanitizeString(word: string): string{
    return word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '');
}

function isOnlyNumbers(word: string){
    const isNumeric = new RegExp(/^[0-9]+$/);
    return isNumeric.test(word);
}