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
            setCurrentCards: (cards: string[]) =>
                Effect.succeed(CardStore.setCurrentCards(cards)),
            setCardImageAsset: (cards: string[]) =>
                Effect.succeed(CardStore.setCardImageAsset(cards)),
            setShowedCards: (cards: ShowedCards) =>
                Effect.succeed(CardStore.setShowedCards(cards)),
            addShowedCards: (cards: ShowedCards) =>
                Effect.succeed(CardStore.addShowedCards(cards)),
            openAllShowedCards: () =>
                Effect.succeed(CardStore.openAllShowedCards()),
            resetShowedCards: () =>
                Effect.succeed(CardStore.resetShowedCards()),
            setPairCardAttempList: (attemps: PairCardAttempList) =>
                Effect.succeed(CardStore.setPairCardAttempList(attemps)),
            resetPairCardAttempList: () =>
                Effect.succeed(CardStore.resetPairCardAttempList()),
        }),
    ),
);
