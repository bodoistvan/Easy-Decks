import { Card } from "./card";

export interface Report {
    id: string,
    owner: string,
    deck: string,
    card: Card,
    reportedBy: string,
    text: string,
    createdAt: Date,
    type: string,
    status: string
}
