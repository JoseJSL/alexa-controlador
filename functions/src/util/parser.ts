import { LocationList } from "./devices";

export interface ParsedData{
    Device: string,
    FullLocation: string,
    PIN?: number,
}

export type ErrorMessage = 'location not found' | 'device not found on location' | 'device not found' | 'number not valid';

export function getErrorSpeech(error: Error): string{
    const errorMessage: ErrorMessage = error.message as ErrorMessage;

    if(errorMessage === 'device not found'){
        return 'Lo siento, no encontré ningún dispositivo con ése nombre.';
    } else if(errorMessage === 'location not found'){
        return 'Lo siento, no encontré ningún lugar con ése nombre.'
    } else if(errorMessage === 'device not found on location'){
        return 'Lo siento, no encontré ningún dispositivo en ése lugar.';
    }

    return 'Lo siento, no pude entenderte.';
}

export function parseData(device: string, location: string, number: string, assertPIN?: boolean): ParsedData{
    let data:ParsedData = {
        Device: parseDevice(device),
        FullLocation: parseLocation(location, number),
    };

    if(assertPIN && !LocationList[data.FullLocation]){
        throw new Error('location not found');
    } else if(assertPIN && !LocationList[data.FullLocation].Devices[data.Device]){
        throw new Error('device not found on location');
    }

    data.PIN = LocationList[data.FullLocation].Devices[data.Device].PIN;

    return data;
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