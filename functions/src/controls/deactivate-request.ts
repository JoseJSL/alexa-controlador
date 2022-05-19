import { getIntentName, getSlotValue, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export const DeactivateIntent : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
        return getIntentName(handlerInput.requestEnvelope) === 'DeactivateIntent';
    },
    handle(handlerInput : HandlerInput) : Response {
        let speechText: string;
        const device = getSlotValue(handlerInput.requestEnvelope, 'device');  
        const number = getSlotValue(handlerInput.requestEnvelope, 'number');
        let location = getSlotValue(handlerInput.requestEnvelope, 'location');  

        console.log(`On deactivation: Device: ${device}, Location: ${location}, Number: ${number}`);

        if(number && location){
            location += ' ' + number;
        }
        
        if(device && location){
            speechText = `Desactivando ${device} en ${location}.`;
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
