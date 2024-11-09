// src/ui/Card.ts
export default class Card {
    private classNames: string;
    private children: HTMLElement[];
    private id: string;

    constructor(
        { children, classNames, id }: {
            classNames: string;
            children: HTMLElement[];
            id: string;
        },
    ) {
        this.classNames = classNames;
        this.children = children;
        this.id = id;
    }

    public render(): HTMLElement {
        const card = document.createElement("div");

        card.setAttribute('id', this.id);
        card.className =
            `bg-slate-800 p-5 shadow-lg z-50 rounded-lg text-slate-300 text-xl flex flex-col gap-3 ${this.classNames}`;

        this.children.forEach(child => card.appendChild(child));

        if (this.children.length > 0 && this.children[0].parentElement) {
            this.children[0].parentElement.appendChild(card);
        }

        return card;
    }
}
