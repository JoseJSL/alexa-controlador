import {
    getIntentName,
    getSlotValue,
    HandlerInput,
    RequestHandler,
} from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import {
    getNextClassData,
    getNextClassDataByClassName,
    getNextClassDataByTeacherName,
} from "../util/consult";
import { getSetClassroomId } from "../util/session-data";
import { numTimeToString } from "../util/string";

export const ClassQuestionIntent: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return (
            getIntentName(handlerInput.requestEnvelope) ===
            "ClassQuestionIntent"
        );
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {
        const response = handlerInput.responseBuilder;
        const className = getSlotValue(handlerInput.requestEnvelope, "class");
        const classroomId = await getSetClassroomId(handlerInput);

        let speechText: string = `No encontré ninguna clase llamada ${className}.`;

        if (className && classroomId) {
            const classData = await getNextClassDataByClassName(
                className,
                classroomId
            );

            if (classData) {
                if (classData.claseId > 0) {
                    speechText = `La clase ${
                        classData.nombreClase
                    }, del docente ${
                        classData.nombreProfesor
                    }. Comienza a las ${numTimeToString(
                        classData.horaEntrada
                    )}.`;
                }
            } else {
                speechText = "Lo siento, no puedo responderte en este momento.";
            }
        } else {
            speechText = "Lo siento, no pude entenderte.";
        }

        return response
            .speak(speechText)
            .withSimpleCard("Datos de la clase.", speechText)
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
        const response = handlerInput.responseBuilder;
        const teacherName = getSlotValue(
            handlerInput.requestEnvelope,
            "teacher"
        );
        const classroomId = await getSetClassroomId(handlerInput);

        let speechText: string = `No encontré ninguna clase impartida por ${teacherName}.`;

        if (teacherName) {
            const classData = await getNextClassDataByTeacherName(
                teacherName,
                classroomId
            );

            if (classData) {
                if (classData.claseId > 0) {
                    speechText = `El docente ${
                        classData.nombreProfesor
                    } imparte la clase ${
                        classData.nombreClase
                    }. Comienza a las ${numTimeToString(
                        classData.horaEntrada
                    )}.`;
                }
            } else {
                speechText = "Lo siento, no puedo responderte en este momento.";
            }
        } else {
            speechText = "Lo siento, no pude entenderte.";
        }

        return response
            .speak(speechText)
            .withSimpleCard("Datos de la clase.", speechText)
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
        const response = handlerInput.responseBuilder;
        const time = getSlotValue(handlerInput.requestEnvelope, "teacher");

        let speechText: string = `No encontré ninguna clase alrededor de las ${time}.`;

        if (time) {
            // const numericTime = strTimeToNumber(time);
            const classData: any = null; // await getNextClassDataByTime(numericTime);

            if (classData) {
                if (classData.classId > 0) {
                    speechText = `Hay una clase que `;
                }
            } else {
                speechText = "Lo siento, no puedo responderte en este momento.";
            }
        } else {
            speechText = "Lo siento, no pude entenderte.";
        }

        return response
            .speak(speechText)
            .withSimpleCard("Datos de la clase.", speechText)
            .withShouldEndSession(false)
            .getResponse();
    },
};

export const GeneralNextQuestionIntent: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return (
            getIntentName(handlerInput.requestEnvelope) ===
            "GeneralNextQuestionIntent"
        );
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {
        const response = handlerInput.responseBuilder;
        let speechText: string = "El día de hoy no hay más clases.";

        try {
            const classroomId = await getSetClassroomId(handlerInput);
            const classData = await getNextClassData(classroomId);

            if (classData) {
                if (classData.claseId > 0) {
                    speechText = `La siguiente clase es ${
                        classData.nombreClase
                    }, del docente ${
                        classData.nombreProfesor
                    }. Comienza a las ${numTimeToString(
                        classData.horaEntrada
                    )}.`;
                }
            } else {
                speechText = "Lo siento, no puedo responderte en este momento.";
            }
        } catch (e) {
            const error = e as Error;
            speechText =
                "Lo siento, ocurrió un error inesperado. Intenta preguntarme más tarde.";
            console.error(`Error ::: ${error.name} - ${error.message}`);
        }

        return response
            .speak(speechText)
            .withSimpleCard("Siguiente clase", speechText)
            .reprompt("¿Necesitas algo más?", "ENQUEUE")
            .withShouldEndSession(false)
            .getResponse();
    },
};
