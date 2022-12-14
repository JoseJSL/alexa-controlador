import {
    getIntentName,
    getSlotValue,
    HandlerInput,
    RequestHandler,
} from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { ParsedData } from "../model/device-location";
import { alertPIN } from "../util/esp32handler";
import { getErrorSpeech, parseData } from "../util/device-location-parser";

export const DeactivateIntent: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return (
            getIntentName(handlerInput.requestEnvelope) === "DeactivateIntent"
        );
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {
        let speechText: string;
        const device = getSlotValue(handlerInput.requestEnvelope, "device");
        const location = getSlotValue(handlerInput.requestEnvelope, "location");
        const number = getSlotValue(handlerInput.requestEnvelope, "number");
        const response = handlerInput.responseBuilder;

        if (device && location && number) {
            try {
                const data: ParsedData = parseData(
                    device,
                    location,
                    number,
                    true
                );
                await alertPIN(data.PIN!, "off");
                speechText = `Desactivando ${data.Device} en ${data.FullLocation}.`;
                console.log(
                    `Deactivating: Device: ${device}, Location: ${location}, Number: ${number}`
                );
            } catch (e) {
                console.error(
                    `Error on deactivation: Device: ${device}, Location: ${location}, Number: ${number}:::` +
                        e
                );
                speechText = getErrorSpeech(e as any);
            }
        } else {
            speechText = "Lo siento, no pude ententerte";
        }

        return response
            .speak(speechText)
            .withSimpleCard("Desactivación", speechText)
            .withShouldEndSession(false)
            .getResponse();
    },
};
