import { Card } from "./card";

export interface Report {
    id: string,
    owner: string,
    deck: string,
    card: Card,
    newCard?: {lang1:string, lang2:string},
    changed: boolean,
    reportedBy: string,
    text: string,
    createdAt: Date,
    type: string,
    status: string
}
