import React, {
    useReducer
}
from 'react';
import PropTypes from 'prop-types';
import StoreContext from './store';
import warpDispatch from "../util/warpDispatch.js";

export default function Provider({
    children, reducer, initialState
}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <StoreContext.Provider value={[state, warpDispatch(dispatch)]}>
              {children}
            </StoreContext.Provider>
}

Provider.propTypes = {
    children: PropTypes.element.isRequired,
    reducer: PropTypes.func.isRequired,
    initialState: PropTypes.any.isRequired,
};