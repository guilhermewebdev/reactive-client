import State from '../src/classes/class.state';
import chai from 'chai';

const { assert } = chai;

describe('State', () => {
    const state = new State('teste');

    describe('#addObserver', () => {
        var count = 0;
        const observer = (data: any) => count++;
        state.addObserver(observer);
        state.addObserver(observer);
        assert.equal(count, 2);
    })

    describe('#setState', () => {
        const history = [];
        const observer = (data: any) => history.push(data);
        
    })
})