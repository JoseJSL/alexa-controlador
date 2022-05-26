import { getIntentName, getSlotValue, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { alertPIN } from '../util/esp32handler';
import { getErrorSpeech, parseData } from '../util/parser';

export const ActivateIntent : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
        return getIntentName(handlerInput.requestEnvelope) === 'ActivateIntent';
    },
    async handle(handlerInput : HandlerInput) : Promise<Response> {
        let speechText: string;
        const device = getSlotValue(handlerInput.requestEnvelope, 'device');  
        const number = getSlotValue(handlerInput.requestEnvelope, 'number');
        const location = getSlotValue(handlerInput.requestEnvelope, 'location');  
        const response = handlerInput.responseBuilder;

        if(device && location && number){
            try{
                const data = parseData(device, location, number, true);
                speechText = `Activando ${data.Device} en ${data.FullLocation}. Utilizando el PIN ${data.PIN!}`;
                response.withSimpleCard('Activación', await alertPIN(data.PIN!, 'on'));

                console.log(`On activation: Device: ${device}, Location: ${location}, Number: ${number}`);   
            } catch(e){
                speechText = getErrorSpeech(e as any);
                response.withSimpleCard('Activación', speechText)
                console.log(`Error on activation: Device: ${device}, Location: ${location}, Number: ${number}`);   
                console.error(e);
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