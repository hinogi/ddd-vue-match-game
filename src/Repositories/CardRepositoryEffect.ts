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
    Effect.map(CardStore, (CardStore) =>
        CardRepository.of({
            setCurrentCards: (cards: string[]) => {
                const store = Effect.runSync(CardStore.useCardStore());
                return Effect.succeed(store.setCurrentCards(cards));
            },
            setCardImageAsset: (cards: string[]) => {
                const store = Effect.runSync(CardStore.useCardStore());
                return Effect.succeed(store.setCardImageAsset(cards));
            },
            setShowedCards: (cards: ShowedCards) => {
                const store = Effect.runSync(CardStore.useCardStore());
                return Effect.succeed(store.setShowedCards(cards));
            },
            addShowedCards: (cards: ShowedCards) => {
                const store = Effect.runSync(CardStore.useCardStore());
                return Effect.succeed(store.addShowedCards(cards));
            },
            openAllShowedCards: () => {
                const store = Effect.runSync(CardStore.useCardStore());
                return Effect.succeed(store.openAllShowedCards());
            },
            resetShowedCards: () => {
                const store = Effect.runSync(CardStore.useCardStore());
                return Effect.succeed(store.resetShowedCards());
            },
            setPairCardAttempList: (attemps: PairCardAttempList) => {
                const store = Effect.runSync(CardStore.useCardStore());
                return Effect.succeed(store.setPairCardAttempList(attemps));
            },
            resetPairCardAttempList: () => {
                const store = Effect.runSync(CardStore.useCardStore());
                return Effect.succeed(store.resetPairCardAttempList());
            },
        }),
    ),
);
