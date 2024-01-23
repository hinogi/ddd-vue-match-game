import { defineStore } from 'pinia';
import { Effect, Context, Layer } from 'effect';
import type { CardState, PairCardAttempList, ShowedCards } from '@/Domain/Card';

// type CardStore = ReturnType<typeof useCardStore>
export interface CardStore {
    readonly useCardStore: () => Effect.Effect<
        never,
        never,
        ReturnType<typeof useCardStore>
    >;
}

export const CardStore = Context.Tag<CardStore>();

export const CardStoreLive = Layer.succeed(
    CardStore,
    CardStore.of({
        useCardStore: () => Effect.succeed(useCardStore()),
    }),
);

const useCardStore = defineStore('card', {
    state: (): CardState => ({
        cardImageAsset: [],
        currentCards: [],
        showedCards: {},
        pairCardAttempList: [],
    }),
    getters: {
        currentCards: (state) => state.currentCards,
        showedCards: (state) => state.showedCards,
        pairCardAttempList: (state) => state.pairCardAttempList,
    },

    actions: {
        setCurrentCards(urls: string[]) {
            this.currentCards = urls;
        },
        setCardImageAsset(urls: string[]) {
            this.cardImageAsset = urls;
        },
        setShowedCards(cards: ShowedCards) {
            this.showedCards = cards;
        },
        addShowedCards(cards: ShowedCards) {
            this.$patch({ showedCards: cards });
        },
        openAllShowedCards() {
            const result: ShowedCards = {};

            this.currentCards.forEach((_, index) => {
                result[index] = true;
            });

            this.showedCards = result;
        },
        resetShowedCards() {
            this.showedCards = {};
        },
        setPairCardAttempList(attemps: PairCardAttempList) {
            this.pairCardAttempList = attemps;
        },
        resetPairCardAttempList() {
            this.pairCardAttempList = [];
        },
    },
});
