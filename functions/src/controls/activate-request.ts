import { getIntentName, getSlotValue, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export const ActivateIntent : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
        return getIntentName(handlerInput.requestEnvelope) === 'ActivateIntent';
    },
    handle(handlerInput : HandlerInput) : Response {
        let speechText: string;
        const device = getSlotValue(handlerInput.requestEnvelope, 'device');  
        const number = getSlotValue(handlerInput.requestEnvelope, 'number');
        let location = getSlotValue(handlerInput.requestEnvelope, 'location');  

        console.log(`On activation: Device: ${device}, Location: ${location}, Number: ${number}`);

        if(number && location){
            location += ' ' + number;
        }
        
        if(device && location){
            speechText = `Activando ${device} en ${location}.`;
        } else {
            speechText = 'Lo siento, no pude ententerte';
        }

        return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard('Activación', speechText)
          .withShouldEndSession(false)      
          .getResponse();
    },
};
