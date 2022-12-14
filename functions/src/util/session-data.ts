import { HandlerInput } from "ask-sdk-core";

export function currentclassroomId(handlerInput: HandlerInput): number {
    const classId =
        handlerInput.attributesManager.getSessionAttributes().classId;
    return classId;
}
