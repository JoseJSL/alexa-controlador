import { ErrorHandler, HandlerInput, RequestHandler, getIntentName } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export const launchRequestHandler : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'LaunchRequest';        
    },
    handle(handlerInput : HandlerInput) : Response {
      const speechText = 'Te escucho.';      

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withShouldEndSession(false)
        .getResponse();
    },
};

export const errorHandler : ErrorHandler = {
    canHandle(handlerInput : HandlerInput, error : Error ) : boolean {
      return true;
    },
    async handle(handlerInput : HandlerInput, error : Error) : Promise<Response> {  
      console.error(error.name + '::: ' + error.message);

      return handlerInput.responseBuilder
        .speak('Lo siento, no pude entenderte.')
        .withShouldEndSession(false)
        .getResponse();
    }
};

export const cancelAndStopIntentHandler : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
      const name = getIntentName(handlerInput.requestEnvelope);
      return name === 'AMAZON.CancelIntent' || name === 'AMAZON.StopIntent';
    },
    handle(handlerInput : HandlerInput) : Response {
      return handlerInput.responseBuilder
        .speak('Hasta luego, chefsito')
        .withShouldEndSession(true)      
        .getResponse();
    },
};

export const helpIntentHandler : RequestHandler = {
  canHandle(handlerInput : HandlerInput) : boolean {
    return getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput : HandlerInput) : Response {
    return handlerInput.responseBuilder
      .speak('Aún estoy en desarrollo, no hago mucho.')
      .withShouldEndSession(false)
      .getResponse();
  },
};

export const sessionEndedRequestHandler : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
      return getIntentName(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput : HandlerInput) : Response {  
      return handlerInput.responseBuilder.withShouldEndSession(true).getResponse();
    },
};
