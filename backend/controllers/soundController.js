const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const fs = require('fs');
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const subscriptionKey = process.env.AZURE_TTS_API_KEY;
const serviceRegion = process.env.AZURE_TTS_API_REGION;


module.exports.textToSpeech = Model => catchAsync(async (req, res, next) => {

    const userId = req.user.id;
    const user = req.user;
    const cardId = req.params.id;
    const wordIndex = req.params.index * 1;

    if (wordIndex != 1 && wordIndex != 2) {
        return next(new AppError("param error: wordIndex sould be 1 or 2", 403));
    }

    const card = await Model.Card.findOne({ _id: cardId });

    if (!card)
        return next(new AppError("no card found by id", 404));


    const deck = await Model.Deck.findOne({ _id: card._deck });

    if (!deck)
        return next(new AppError("no deck found by id", 404));

    let word = { };

    if (wordIndex == 1) {
        word.text = card.lang1;
        word.country = deck.lang1;
    }

    if (wordIndex == 2) {
        word.text = card.lang2;
        word.country = deck.lang2;
    }

    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

    const speechVoiceName = user.voices[word.country];
    speechConfig.speechSynthesisVoiceName = speechVoiceName;
    var synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    synthesizer.speakTextAsync(word.text,
        function (result) {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                
                 var sound = Buffer.from(result.privAudioData);

                 res.writeHead(200, {
                     'Content-Type': 'audio/x-wav  ',
                     'Content-Length': sound.length
                 });

                 console.log("sending sound")

                 res.end(sound);


            } else {
                console.error("Speech synthesis canceled, " + result.errorDetails +
                    "\nDid you update the subscription info?");
            }
            synthesizer.close();
            synthesizer = undefined;
        },
        function (err) {
            console.trace("err - " + err);
            synthesizer.close();
            synthesizer = undefined;
        });

})
