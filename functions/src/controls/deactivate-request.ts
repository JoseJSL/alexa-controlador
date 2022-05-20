import { getIntentName, getSlotValue, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { getErrorSpeech, parseData, ParsedData } from '../util/parser';

export const DeactivateIntent : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
        return getIntentName(handlerInput.requestEnvelope) === 'DeactivateIntent';
    },
    handle(handlerInput : HandlerInput) : Response {
        let speechText: string;
        const device = getSlotValue(handlerInput.requestEnvelope, 'device');  
        const location = getSlotValue(handlerInput.requestEnvelope, 'location');  
        const number = getSlotValue(handlerInput.requestEnvelope, 'number');

        if(device && location && number){
            try{
                const data: ParsedData = parseData(device, location, number, true);
                speechText = `Desactivando ${data.Device} en ${data.FullLocation}.`;
                
                console.log(`Deactivating: Device: ${device}, Location: ${location}, Number: ${number}`);
            } catch(e){
                console.log(`Error on deactivation: Device: ${device}, Location: ${location}, Number: ${number}`);
                speechText = getErrorSpeech(e as any);
            }
        } else {
            speechText = 'Lo siento, no pude ententerte';
        }

        return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard('Desactivación', speechText)
          .withShouldEndSession(false)      
          .getResponse();
    },
};
