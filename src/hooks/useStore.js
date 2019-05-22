import {
    useContext
}
from 'react';
import StoreContext from './store';

export default function useStore() {
    const [state, dispatch] = useContext(StoreContext);
    console.log(useContext(StoreContext));
    return {
        state, dispatch
    };
}