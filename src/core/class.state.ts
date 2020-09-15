
export default class State {
    private observers: Array<(state: any) => void> = [];
    private _state: any;

    constructor(initialState: any) {
        this._state = initialState;
    }

    private notifyObservers() {
        this.observers.forEach(observer => observer(this._state));
    }

    public addObserver(observer: (state: any) => void) {
        this.observers.push(observer);
        return this;
    }

    set state(state: any) {
        if(state !== this._state){
            this.state = state;
            this.notifyObservers();
        }
    }
}