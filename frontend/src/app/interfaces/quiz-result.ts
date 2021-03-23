export interface QuizResult {
    id: string,
    user: string,
    deck: string,
    startedAt: Date,
    finishedAt: Date,
    resultPercent: number,
    selectedLang: string,
    amount: number,
    results: Array<
        {
            id: string,
            lang1: string,
            lang2: string,
            status: string
        }
    >
}
