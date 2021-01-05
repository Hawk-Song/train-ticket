import {createStore, combineReducers, applyMiddleware} from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

export default createStore(
    combineReducers(reducers),
    {
        from: 'Sunnyvale',
        to: 'Palo Alto',
        isCitySelectorVisible: false,
        currentSelectingLeftCity: false,
        cityData: null,
        isLoadingCityData: false,
        isDateSelectorVisible: false,
        highSpeed: false,
    },
    applyMiddleware(thunk)
)