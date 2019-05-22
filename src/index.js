import React from 'react';
import ReactDOM from 'react-dom';

import Provider from './hooks/provider.js';
import SwitchCom from './router/router.js';
import * as serviceWorker from './serviceWorker';


function reducer(state, action) {

    switch (action.type) {
        case "FETCH_ABOUT":
            {
                let { payload } = action
                console.log(1111, action);
                return Object.assign({}, state, {...payload}); 
                
            }
        case 'increase':
            {
                state.num += 1
                return Object.assign({}, state);
            }

        case 'decrease':
            {
                state.num -= 1;
                return Object.assign({}, state);
            }

        default:
            {
                return state;
            }
    }
}

const initialState = {
    num: 0
};



ReactDOM.render(
    <Provider reducer={reducer} initialState={initialState}>
        <SwitchCom/>
    </Provider>, document.getElementById('root'));