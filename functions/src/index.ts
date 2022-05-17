import * as functions from "firebase-functions";
import { SkillBuilders, } from "ask-sdk-core";
import { SkillRequestSignatureVerifier, TimestampVerifier } from "ask-sdk-express-adapter";
import { cancelAndStopIntentHandler, errorHandler, helpIntentHandler, launchRequestHandler, sessionEndedRequestHandler } from './base-request';

const skill = SkillBuilders.custom()
    .addRequestHandlers(
        launchRequestHandler,
        helpIntentHandler,
        cancelAndStopIntentHandler,
        sessionEndedRequestHandler,
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
