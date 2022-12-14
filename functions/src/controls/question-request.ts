import {
    getIntentName,
    getSlotValue,
    HandlerInput,
    RequestHandler,
} from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export const ClassQuestionIntent: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return (
            getIntentName(handlerInput.requestEnvelope) ===
            "ClassQuestionIntent"
        );
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {
        let speechText: string = "El día de hoy no hay más clases.";

        const response = handlerInput.responseBuilder;
        // const className = getSlotValue(handlerInput.requestEnvelope, "class");

        return response
            .speak(speechText)
            .withSimpleCard("Desactivación", speechText)
            .withShouldEndSession(false)
            .getResponse();
    },
};

export const TeacherQuestionIntent: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return (
            getIntentName(handlerInput.requestEnvelope) ===
            "TeacherQuestionIntent"
        );
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {
        let speechText: string = "El día de hoy no hay más clases.";

        const response = handlerInput.responseBuilder;
        // const teacherName = getSlotValue(
        //     handlerInput.requestEnvelope,
        //     "teacher"
        // );

        return response
            .speak(speechText)
            .withSimpleCard("Desactivación", speechText)
            .withShouldEndSession(false)
            .getResponse();
    },
};

export const ScheduleQuestionIntent: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return (
            getIntentName(handlerInput.requestEnvelope) ===
            "ScheduleQuestionIntent"
        );
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {
        let speechText: string = "El día de hoy no hay más clases.";

        const response = handlerInput.responseBuilder;
        // const time = getSlotValue(handlerInput.requestEnvelope, "time");

        return response
            .speak(speechText)
            .withSimpleCard("Desactivación", speechText)
            .withShouldEndSession(false)
            .getResponse();
    },
};

export const GeneralQuestionIntent: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return (
            getIntentName(handlerInput.requestEnvelope) ===
            "GeneralQuestionIntent"
        );
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {
        let speechText: string = "El día de hoy no hay más clases.";

        const response = handlerInput.responseBuilder;
        const isTimeRequest = !!getSlotValue(
            handlerInput.requestEnvelope,
            "timeAlias"
        );

        if (isTimeRequest) {
            speechText = "La clase de X del maestro Y. Comienza a las Z  P.M.";
        } else {
            speechText =
                "La siguiente clase X del maestro Y. Inicia a las Z  P.M.";
        }

        return response
            .speak(speechText)
            .withSimpleCard("GeneralQuestion", speechText)
            .withShouldEndSession(false)
            .getResponse();
    },
};
