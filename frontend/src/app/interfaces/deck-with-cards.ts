import { Card } from "./card";
import { DeckInfo } from "./deck-info";

export interface DeckWithCards extends DeckInfo {
    public: boolean,
    cards : Card[]
}
