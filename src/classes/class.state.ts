interface Observer extends Function {
    (state: any): void
}
export default class State<T> {
    private _observers: Array<Observer> = [];
    private _state: T;
    private _history?: Array<T>;
    private _useHistory?: boolean;
    
    constructor(initialState: T, useHistory?: boolean) {
        this._state = initialState;
        this._useHistory = useHistory;
        this.addToHistory(initialState);
    }

    set state(state: T) {
        if (state !== this._state) {
            this._state = state;
            this.notifyObservers();
            this.addToHistory(state);
        }
    }

    get state(): T {
        return this._state;
    }

    get observers(): Array<Observer> {
        return this._observers;
    }

    get history(): Array<T> | undefined {
        return this._history;
    }

    private notifyObservers() {
        this._observers.forEach(observer => observer(this._state));
    }

    private addToHistory(state: T){
        this._useHistory && this._history?.push(state);
    }

    public clearHistory(){
        !!this._history && (this._history = []);
        return this;
    }

    public deleteHistory() {
        delete this._history;
        return this;
    }

    public addObserver(observer: Observer) {
        this._observers.push(observer);
        observer(this._state)
        return this;
    }

    public addMultipleObservers(observers: Array<Observer>) {
        this._observers = this._observers.concat(observers);
        observers.forEach(observer => observer(this._state));
        return this;
    }

    public setObservers(observers: Array<Observer>) {
        this._observers !== observers && (this._observers = observers);
        return this;
    }

    public clearObservers() {
        this._observers = [];
        return this;
    }

}