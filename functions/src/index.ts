import * as functions from "firebase-functions";
import { SkillBuilders } from "ask-sdk-core";
import {
    SkillRequestSignatureVerifier,
    TimestampVerifier,
} from "ask-sdk-express-adapter";
import {
    cancelAndStopIntentHandler,
    errorHandler,
    helpIntentHandler,
    launchRequestHandler,
    sessionEndedRequestHandler,
} from "./base-request";
import { ActivateIntent } from "./controls/activate-request";
import { DeactivateIntent } from "./controls/deactivate-request";
import {
    ClassQuestionIntent,
    GeneralQuestionIntent,
    ScheduleQuestionIntent,
    TeacherQuestionIntent,
} from "./controls/question-request";

const skill = SkillBuilders.custom()
    .addRequestHandlers(
        launchRequestHandler,
        helpIntentHandler,
        cancelAndStopIntentHandler,
        sessionEndedRequestHandler,
        ActivateIntent,
        DeactivateIntent,
        ClassQuestionIntent,
        TeacherQuestionIntent,
        ScheduleQuestionIntent,
        GeneralQuestionIntent
    )
    .addErrorHandlers(errorHandler)
    .create();

exports.alexa = functions.https.onRequest(async (req, res) => {
    try {
        const textBody = req.rawBody.toString();

        await new SkillRequestSignatureVerifier().verify(textBody, req.headers);
        await new TimestampVerifier().verify(textBody);

        const response = await skill.invoke(req.body);
        res.send(response);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
});
