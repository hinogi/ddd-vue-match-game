import type { Usecase } from '@/Application/types';
import {
    addCardAttemps,
    checkPairCards,
    checkIsFinish,
    removeAttempsCards,
    checkIsShowedCard,
} from '@/Domain/Card';
import { GameStatus } from '@/Domain/Game';
import type { CardRepository } from '@/Repositories/CardRepositoryEffect';
import type { GameRepository } from '@/Repositories/GameRepository';

export class OpenCardUsecase implements Usecase {
    constructor(
        private index: number,
        private cardRepository: CardRepository,
        private gameRepository: GameRepository,
        private showWonNotification: () => void,
    ) {}

    async execute(): Promise<void> {
        const DELAY_TO_CLOSE = 1000;
        const resetPairAttemps = () =>
            this.cardRepository.setPairCardAttempList([]);
        const { showedCards } = this.cardRepository;

        if (checkIsShowedCard(showedCards(), this.index)) {
            return;
        }

        const { pairCardAttempList } = this.cardRepository;

        if (pairCardAttempList().length >= 2) {
            return;
        }

        const { currentCards } = this.cardRepository;

        const cardAttemps = addCardAttemps(
            pairCardAttempList(),
            currentCards(),
            this.index,
        );

        this.cardRepository.setPairCardAttempList(cardAttemps);

        this.cardRepository.addShowedCards({ [this.index]: true });

        if (pairCardAttempList.length === 2) {
            let newShowedCards = this.cardRepository.showedCards();

            if (!checkPairCards(pairCardAttempList())) {
                newShowedCards = removeAttempsCards(
                    showedCards(),
                    pairCardAttempList(),
                );
            } else {
                const { currentCards } = this.cardRepository;

                const isFinishedGame = checkIsFinish(
                    showedCards(),
                    currentCards(),
                );

                if (isFinishedGame) {
                    this.cardRepository.setShowedCards(newShowedCards);
                    this.showWonNotification();
                    this.gameRepository.setGameStatus(GameStatus.stopped);
                }
            }

            setTimeout(() => {
                const { gameStatus } = this.gameRepository.store;

                if (gameStatus === GameStatus.stopped) {
                    return;
                }

                this.cardRepository.setShowedCards(newShowedCards);

                resetPairAttemps();
            }, DELAY_TO_CLOSE);
        }
    }
}
