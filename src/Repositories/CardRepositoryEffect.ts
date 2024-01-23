import { CardStore } from '@/Data/cardEffect.store';
import { Effect, Context, Layer } from 'effect';
import type { PairCardAttempList, ShowedCards } from '@/Domain/Card';

export interface CardRepository {
    readonly setCurrentCards: (cards: string[]) => void;
    readonly setCardImageAsset: (cards: string[]) => void;
    readonly setShowedCards: (cards: ShowedCards) => void;
    readonly addShowedCards: (cards: ShowedCards) => void;
    readonly openAllShowedCards: (cards: ShowedCards) => void;
    readonly resetShowedCards: () => void;
    readonly setPairCardAttempList: (attemps: PairCardAttempList) => void;
    readonly resetPairCardAttempList: () => void;
    readonly currentCards: () => string[];
    readonly showedCards: () => ShowedCards;
    readonly pairCardAttempList: () => PairCardAttempList;
}

export const CardRepository = Context.Tag<CardRepository>();

export const CardRepositoryLive = Layer.effect(
    CardRepository,
    Effect.gen(function* (_) {
        const store = yield* _(
            Effect.flatMap(CardStore, (_) => _.useCardStore()),
        );

        return {
            setCurrentCards: (cards: string[]) => store.setCurrentCards(cards),
            setCardImageAsset: (cards: string[]) =>
                store.setCardImageAsset(cards),
            setShowedCards: (cards: ShowedCards) => store.setShowedCards(cards),
            addShowedCards: (cards: ShowedCards) => store.addShowedCards(cards),
            openAllShowedCards: () => store.openAllShowedCards(),
            resetShowedCards: () => store.resetShowedCards(),
            setPairCardAttempList: (attemps: PairCardAttempList) =>
                store.setPairCardAttempList(attemps),
            resetPairCardAttempList: () => store.resetPairCardAttempList(),
            currentCards: () => store.currentCards,
            showedCards: () => store.showedCards,
            pairCardAttempList: () => store.pairCardAttempList,
        };
    }),
);
