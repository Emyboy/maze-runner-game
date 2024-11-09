// src/ui/GameMetrics.ts
export default class GameMetrics {
    private label: string;
    private value: string;
    private parentElement: HTMLElement;
    private id: string;

    constructor(
        { id, label, parentElement, value }: {
            label: string;
            value: string;
            parentElement: HTMLElement;
            id: string;
        },
    ) {
        this.label = label;
        this.value = value;
        this.parentElement = parentElement;
        this.id = id;
    }

    public render(): HTMLElement {
        const metricsDiv = document.createElement("div");
        metricsDiv.className = "flex gap-2 items-center text-slate-300 text-xl";
        metricsDiv.id = this.id;

        const labelParagraph = document.createElement("p");
        labelParagraph.textContent = this.label;

        const valueContainer = document.createElement("div");
        valueContainer.className = "w-28";

        const valueParagraph = document.createElement("p");
        valueParagraph.textContent = this.value;

        valueContainer.appendChild(valueParagraph);
        metricsDiv.appendChild(labelParagraph);
        metricsDiv.appendChild(valueContainer);

        this.parentElement.appendChild(metricsDiv);

        return metricsDiv;
    }

    public updateValue(newValue: string): void {
        const valueParagraph = document.querySelector(`#${this.id} > div > p`);
        if (valueParagraph) {
            valueParagraph.textContent = newValue;
        }
    }
}
