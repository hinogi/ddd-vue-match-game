import { CardStore } from '@/Data/cardEffect.store';
import { Effect, Context, Layer } from 'effect';
import type { PairCardAttempList, ShowedCards } from '@/Domain/Card';

export interface CardRepository {
    readonly setCurrentCards: (
        cards: string[],
    ) => Effect.Effect<never, never, void>;
    readonly setCardImageAsset: (
        cards: string[],
    ) => Effect.Effect<never, never, void>;
    readonly setShowedCards: (
        cards: ShowedCards,
    ) => Effect.Effect<never, never, void>;
    readonly addShowedCards: (
        cards: ShowedCards,
    ) => Effect.Effect<never, never, void>;
    readonly openAllShowedCards: (
        cards: ShowedCards,
    ) => Effect.Effect<never, never, void>;
    readonly resetShowedCards: () => Effect.Effect<never, never, void>;
    readonly setPairCardAttempList: (
        attemps: PairCardAttempList,
    ) => Effect.Effect<never, never, void>;
    readonly resetPairCardAttempList: () => Effect.Effect<never, never, void>;
}

export const CardRepository = Context.Tag<CardRepository>();

export const CardRepositoryLive = Layer.effect(
    CardRepository,
    Effect.gen(function* (_) {
        const store = yield* _(Effect.map(CardStore, (_) => _.useCardStore()));

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
        };
    }),
);
