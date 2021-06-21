const Schema = require('mongoose').Schema;

const flagInfo = 
[
    {
        displayName: "Hungary",
        dataName: "hu",
        voices: [
            {name: "hu-HU-NoemiNeural", voice: "hu-HU-NoemiNeural" },
            {name: "hu-HU-TamasNeural", voice: "hu-HU-TamasNeural" }
            
        ]
    },
    {
        displayName: "Germany",
        dataName: "de",
        voices: [
            {name: "de-DE-KatjaNeural", voice: "de-DE-KatjaNeural" },
            {name: "de-AT-JonasNeural", voice: "de-AT-JonasNeural" },
            {name: "de-AT-IngridNeural", voice: "de-AT-IngridNeural"},
            {name: "de-DE-ConradNeural", voice: "de-DE-ConradNeural" },
            {name: "de-CH-LeniNeural", voice: "de-AT-JonasNeural" },
            {name: "de-AT-JonasNeural", voice: "de-CH-JanNeural" }
        ]
    },
    {
        displayName: "British",
        dataName: "gb",
        voices: [
            {name: "en-AU-NatashaNeural	", voice: "en-AU-NatashaNeural"},
            {name: "en-AU-WilliamNeural", voice: "en-AU-WilliamNeural" },
            {name: "en-CA-ClaraNeural", voice: "en-CA-ClaraNeural" },
            {name: "en-CA-LiamNeural", voice: "en-CA-LiamNeural" },
            {name: "en-IN-NeerjaNeural", voice: "en-IN-NeerjaNeural" },
            {name: "en-IE-EmilyNeural", voice: "en-IE-EmilyNeural" },
            {name: "en-IE-ConnorNeural", voice: "en-IE-ConnorNeural" },
            {name: "en-PH-RosaNeural", voice: "en-PH-RosaNeural" },
            {name: "en-PH-JamesNeural", voice: "en-PH-JamesNeural" },
            {name: "en-GB-LibbyNeural", voice: "en-GB-LibbyNeural" },
            {name: "en-GB-MiaNeural", voice: "en-GB-MiaNeural" },
            {name: "en-GB-RyanNeural", voice: "en-GB-RyanNeural" },
            {name: "en-US-AriaNeural", voice: "en-US-AriaNeural" },
            {name: "en-US-JennyNeural", voice: "en-US-JennyNeural" },
            {name: "en-US-GuyNeural", voice: "en-US-GuyNeural" }
        ]
    },
    {
        displayName: "Portugal",
        dataName: "pt",
        voices: [
            {name: "pt-PT-FernandaNeural", voice: "pt-PT-FernandaNeural" },
            {name: "pt-PT-RaquelNeural", voice: "pt-PT-RaquelNeural" },
            {name: "pt-PT-DuarteNeural", voice: "pt-PT-DuarteNeural" }
        ]
    },
    {
        displayName: "Spain",
        dataName: "es",
        voices: [
            {name: "es-MX-DaliaNeural", voice: "es-MX-DaliaNeural" },
            {name: "es-MX-JorgeNeural", voice: "es-MX-JorgeNeural" },
            {name: "es-ES-ElviraNeural", voice: "es-ES-ElviraNeural" },
            {name: "es-ES-AlvaroNeural", voice: "es-ES-AlvaroNeural" }
        ]
    },
    {
        displayName: "Romania",
        dataName: "ro",
        voices: [
            {name: "ro-RO-AlinaNeural", voice: "ro-RO-AlinaNeural" },
            {name: "ro-RO-EmilNeural", voice: "ro-RO-EmilNeural" }
        ]
    },
    {
        displayName: "France",
        dataName: "fr",
        voices: [
            {name: "fr-BE-CharlineNeural", voice: "fr-BE-CharlineNeural" },
            {name: "fr-BE-GerardNeural", voice: "fr-BE-GerardNeural" },
            {name: "fr-CA-SylvieNeural", voice: "fr-CA-SylvieNeural" },
            {name: "fr-CA-AntoineNeural", voice: "fr-CA-AntoineNeural" },
            {name: "fr-CA-JeanNeural", voice: "fr-CA-JeanNeural" },
            {name: "fr-FR-DeniseNeural", voice: "fr-FR-DeniseNeural" },
            {name: "fr-FR-HenriNeural", voice: "fr-FR-HenriNeural" },
            {name: "fr-CH-ArianeNeural", voice: "fr-CH-ArianeNeural" },
            {name: "fr-CH-FabriceNeural", voice: "fr-CH-FabriceNeural" }
        ]
    }

].sort((a,b) => (a.displayName > b.displayName) ? 1 : ((b.displayName > a.displayName) ? -1 : 0))

module.exports.flagInfo = flagInfo;

module.exports.getVoiceShema = function() {

    const voices = {}
    this.flagInfo.forEach( flag => {
        voices[flag.dataName] = 
        { 
            type: String, 
            default: flag.voices[0].voice,
            required : true
        };
    })
    return new Schema({...voices, _id: false});
}.bind(this)

// const init = function() {
    
//     const test = this.getVoiceShema();

//     console.log(test);

// }.bind(this)()