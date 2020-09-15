
export default class State {
    private _observers: Array<(state: any) => void> = [];
    private _state: any;

    constructor(initialState: any) {
        this._state = initialState;
    }

    private notifyObservers() {
        this._observers.forEach(observer => observer(this._state));
    }

    public addObserver(observer: (state: any) => void) {
        this._observers.indexOf(observer) === -1 && this._observers.push(observer);
        observer(this._state)
        return this;
    }

    public addMultipleObservers(observers: Array<(state: any) => void>) {
        this._observers.concat(
            observers.filter(item => this._observers.indexOf(item) === -1)
        );
    }

    set state(state: any) {
        if (state !== this._state) {
            this.state = state;
            this.notifyObservers();
        }
    }
}