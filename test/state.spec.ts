import State from '../src/classes/class.state';
import chai from 'chai';

const { assert } = chai;

describe('State', () => {
    const state = new State('test');
    assert.equal(state.state, 'test')

    describe('#addObserver', () => {
        var count = 0;
        const observer = () => count++;
        state.addObserver(observer)
            .addObserver(observer);
        assert.equal(count, 2);
    })
    
    describe('#clearObservers', () => {
        state.clearObservers();
        assert.lengthOf(state.observers, 0);
    })
    
    describe('#setState', () => {
        const history: Array<any> = [];
        const observer = (data: any) => history.push(data);
        state.addObserver(observer)
        state.state = 'new test'
        assert.lengthOf(history, 2)
        assert.equal(history[0], 'test')
        assert.equal(history[1], 'new test')
    })
    
    describe('#addMultipleObservers', () => {
        state.clearObservers();
        const observer = (data: any) => console.log(data)
        const observer2 = (data: any) => console.log(data, 'hello world')
        state.addMultipleObservers([observer, observer, observer2])
        assert.lengthOf(state.observers, 3)
    })
})