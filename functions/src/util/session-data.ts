import { getSlotValue, HandlerInput } from "ask-sdk-core";
import { getNextClassId } from "./consult";

export async function getSetClassroomId(
    handlerInput: HandlerInput
): Promise<number> {
    const sessionData = handlerInput.attributesManager.getSessionAttributes();

    const classroomId = Number(
        getSlotValue(handlerInput.requestEnvelope, "classroomId")
    );

    if (classroomId) {
        sessionData.classroomId = classroomId;
        return sessionData.classroomId;
    } else if (sessionData.classroomId) {
        return sessionData.classroomId;
    } else {
        return 1;
    }
}

export async function geSetNextClassId(
    handlerInput: HandlerInput
): Promise<number> {
    const sessionData = handlerInput.attributesManager.getSessionAttributes();

    if (sessionData.classId) {
        return sessionData.classId;
    } else {
        const classroomId = await getSetClassroomId(handlerInput);
        const classId = await getNextClassId(classroomId);

        sessionData.classId = classId;
        return classId;
    }
}
