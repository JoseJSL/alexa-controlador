import { getIntentName, getSlotValue, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { getErrorSpeech, parseData } from '../util/parser';

export const ActivateIntent : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
        return getIntentName(handlerInput.requestEnvelope) === 'ActivateIntent';
    },
    handle(handlerInput : HandlerInput) : Response {
        let speechText: string;
        const device = getSlotValue(handlerInput.requestEnvelope, 'device');  
        const number = getSlotValue(handlerInput.requestEnvelope, 'number');
        const location = getSlotValue(handlerInput.requestEnvelope, 'location');  

        if(device && location && number){
            try{
                const data = parseData(device, location, number, true);
                speechText = `Activando ${data.Device} en ${data.FullLocation}.`;
                
                console.log(`On activation: Device: ${device}, Location: ${location}, Number: ${number}`);   
            } catch(e){
                speechText = getErrorSpeech(e as any);
                console.log(`Error on activation: Device: ${device}, Location: ${location}, Number: ${number}`);   
            }
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
