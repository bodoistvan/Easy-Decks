const flagInfo = 
[
    {
        displayName: "Hungary",
        dataName: "hu"
    },
    {
        displayName: "Germany",
        dataName: "de"
    },
    {
        displayName: "British",
        dataName: "gb"
    },
    {
        displayName: "Portugal",
        dataName: "pt"
    },
    {
        displayName: "Spain",
        dataName: "es"
    },
    {
        displayName: "Romania",
        dataName: "ro"
    },
    {
        displayName: "France",
        dataName: "fr"
    }
].sort((a,b) => (a.displayName > b.displayName) ? 1 : ((b.displayName > a.displayName) ? -1 : 0))



module.exports = flagInfo;