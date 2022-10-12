export default class DataTableEvent {
    constructor({eventType, target, effect, sourceColumn, targetColumn, value}) {
        this.eventType = eventType;
        this.effect = effect;
        this.target = target;
        this.sourceColumn = sourceColumn || null;
        this.targetColumn = targetColumn;
    }
}