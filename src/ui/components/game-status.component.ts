// src/ui/components/game-status.component.ts
import Card from "../card.ui";
import GameMetrics from "../metrix.ui";

export class GameStatusComponent {
    private scoreMetric!: GameMetrics;
    private distanceMetric!: GameMetrics;
    private scoreCard!: HTMLElement;

    constructor(private parent: HTMLElement) {
        this.scoreMetric = new GameMetrics({
            id: 'score-metric',
            label: 'Score:',
            parentElement: parent,
            value: '0',
        });

        this.distanceMetric = new GameMetrics({
            id: 'distance-metric',
            label: 'Distance:',
            parentElement: parent,
            value: '0',
        });

        this.scoreCard = new Card({
            classNames: 'absolute top-5 right-5',
            children: [],
            id: 'score-card',
        }).render();

        this.scoreCard.appendChild(this.scoreMetric.render());
        this.scoreCard.appendChild(this.distanceMetric.render());

        parent.appendChild(this.scoreCard);
    }

    updateScore(newScore: string) {
        this.scoreMetric.updateValue(newScore);
    }

    updateDistance(newDistance: string) {
        this.distanceMetric.updateValue(newDistance);
    }
}