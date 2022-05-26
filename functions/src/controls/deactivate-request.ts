import { getIntentName, getSlotValue, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { alertPIN } from '../util/esp32handler';
import { getErrorSpeech, parseData, ParsedData } from '../util/parser';

export const DeactivateIntent : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
        return getIntentName(handlerInput.requestEnvelope) === 'DeactivateIntent';
    },
    async handle(handlerInput : HandlerInput) : Promise<Response> {
        let speechText: string;
        const device = getSlotValue(handlerInput.requestEnvelope, 'device');  
        const location = getSlotValue(handlerInput.requestEnvelope, 'location');  
        const number = getSlotValue(handlerInput.requestEnvelope, 'number');
        const response = handlerInput.responseBuilder;
        
        if(device && location && number){
            try{
                const data: ParsedData = parseData(device, location, number, true);
                speechText = `Desactivando ${data.Device} en ${data.FullLocation}.`;
                response.withSimpleCard('Activación', await alertPIN(data.PIN!, 'off'));
                console.log(`Deactivating: Device: ${device}, Location: ${location}, Number: ${number}`);
            } catch(e){
                console.error(e);
                console.log(`Error on deactivation: Device: ${device}, Location: ${location}, Number: ${number}`);
                speechText = getErrorSpeech(e as any);
                response.withSimpleCard('Desactivación', speechText);
            }
        } else {
            speechText = 'Lo siento, no pude ententerte';
        }

        return response
          .speak(speechText)
          .withShouldEndSession(false)      
          .getResponse();
    },
};
