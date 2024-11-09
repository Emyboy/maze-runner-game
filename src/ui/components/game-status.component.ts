import Card from "../card.ui";
import GameMetrics from "../metrix.ui";

export const CreateGameStatusComponent = (parent: HTMLElement | null) => {
    if (!parent) return;

    const scoreMetric = new GameMetrics({
        id: 'score-metric',
        label: 'Score:',
        parentElement: parent,
        value: '0',
    });

    const distanceMetric = new GameMetrics({
        id: 'distance-metric',
        label: 'Distance:',
        parentElement: parent,
        value: '0',
    });
    
    const scoreCard = new Card({
        classNames: 'absolute top-5 right-5', 
        children: [], 
        id: 'score-card', 
    }).render();

    scoreCard.appendChild(scoreMetric.render());
    scoreCard.appendChild(distanceMetric.render());  
    
    parent.appendChild(scoreCard);
}
