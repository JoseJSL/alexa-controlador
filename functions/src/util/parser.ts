import { LocationList } from "./devices";

export interface ParsedData{
    Device: string,
    FullLocation: string,
    PIN?: number,
}

export type ErrorMessage = 'location not found' | 'device not found on location' | 'device not found' | 'number not valid' | 'client not available' | 'unknown';

export function getErrorSpeech(error: Error): string{
    const errorMessage: ErrorMessage = error.message ? error.message as ErrorMessage : 'unknown';

    if(errorMessage === 'device not found'){
        return 'Lo siento, no encontré ningún dispositivo con ése nombre.';
    } else if(errorMessage === 'location not found'){
        return 'Lo siento, no encontré ningún lugar con ése nombre.'
    } else if(errorMessage === 'device not found on location'){
        return 'Lo siento, no encontré ningún dispositivo en ése lugar.';
    } else if(errorMessage == 'client not available'){
        return 'Lo siento, no pude conectarme con el cliente. Vuelve a intentarlo más tarde';
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

    if(strIncludes(device, 'luces', 'luz', 'foco')){
        return 'luces';
    } else if (strIncludes(device, 'aire', 'acondicionado')){
        return 'aires acondicionados';
    } else if (strIncludes(device, 'puerta', 'entrada')){
        'puertas';
    }

    throw new Error('device not found');
}

function parseLocation(location: string, number: string){
    if(!isOnlyNumbers(number)){
        throw new Error('number not valid');   
    }

    location = sanitizeString(location);

    if(strIncludes(location, 'centro de', 'computo', 'computa')){
        return 'centro de cómputo ' + number;
    } else if(strIncludes(location, 'aula', 'sala')){
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

function strIncludes(str: string, ...includes: string[]): boolean{
    for(let i = 0; i < includes.length; i++){
        if(str.indexOf(includes[i]) > -1){
            return true;
        }
    }
    
    return false;
}