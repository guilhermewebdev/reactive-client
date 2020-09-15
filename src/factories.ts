import State from './classes/class.state';

const stateFactory = <T>(params: T | any = {}, useHistory: boolean = false): State<T> => {
    const state: State<T> = new State(params, useHistory)
    return state;
}

export {
    stateFactory
}