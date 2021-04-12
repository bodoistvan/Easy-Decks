import { Card } from "./card";
import { QuizQuestion } from "./quiz-question";

export interface Quiz {
    id: string,
    startedAt: Date,
    finishAt: Date,
    amount: number,
    userId: string,
    selectedLang: string,
    cards?: Card[],
    questions?: QuizQuestion[]
}
