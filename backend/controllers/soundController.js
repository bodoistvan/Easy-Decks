const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const fs = require('fs');
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const subscriptionKey = "79202d23004d4b7aa4e7c635ae7e45a3";
const serviceRegion = "westeurope";

exports.download = (Model) => catchAsync(async (req, res, next) => {

    res.send("ok");

    var sdk = require("microsoft-cognitiveservices-speech-sdk");

    // replace with your own subscription key,
    // service region (e.g., "westus"), and
    // the name of the file you save the synthesized audio.
    var subscriptionKey = "79202d23004d4b7aa4e7c635ae7e45a3";
    var serviceRegion = "westeurope"; // e.g., "westus"
    var filename = "YourAudioFile2222.wav";

    // we are done with the setup

    // now create the audio-config pointing to our stream and
    // the speech config specifying the language.
    var audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

    //speechConfig.speechSynthesisLanguage = "hu-HU";

    //speechConfig.speechSynthesisLanguage = "hu-HU"
    // speechConfig.setProperty("gender", "Female")
    speechConfig.speechSynthesisVoiceName = "hu-HU-NoemiNeural";

    console.log(speechConfig);

    // create the speech synthesizer.
    var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);



});

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
                console.log("synthesis finished.");
                console.log(result.privAudioData)
                
                 var sound = Buffer.from(result.privAudioData);

                 res.writeHead(200, {
                     'Content-Type': 'audio/x-wav  ',
                     'Content-Length': sound.length
                 });

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


    console.log(req.user);

})
