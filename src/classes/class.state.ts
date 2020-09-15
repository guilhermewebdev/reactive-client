interface Observer extends Function {
    (state: any): void
}
export default class State {
    private _observers: Array<Observer> = [];
    private _state: any;

    constructor(initialState: any) {
        this._state = initialState;
    }

    private notifyObservers() {
        this._observers.forEach(observer => observer(this._state));
    }

    public addObserver(observer: Observer) {
        this._observers.indexOf(observer) === -1 && this._observers.push(observer);
        observer(this._state)
        return this;
    }

    public addMultipleObservers(observers: Array<Observer>) {
        this._observers = this._observers.concat(observers);
    }

    public setObservers(observers: Array<Observer>) {
        this._observers !== observers && (this._observers = observers);
    }

    public clearObservers() {
        this._observers = [];
    }

    set state(state: any) {
        if (state !== this._state) {
            this._state = state;
            this.notifyObservers();
        }
    }

    get state(): any {
        return this._state;
    }

    get observers(): Array<Observer> {
        return this._observers;
    }

}