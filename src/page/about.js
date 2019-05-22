import React from 'react';
import useStore from '../hooks/useStore.js';
import fetchInject from "../util/fetch.js";



async function asyncFetch() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({about:2});
      }, 1000);
    });
}


export default () => {
    const {
        state, dispatch
    } = useStore();


    return <div>
        about { state.num }
        <button onClick={()=>{
            //fetchInject()
            dispatch({type:"FETCH_ABOUT", payload: asyncFetch() })
        }}>请求数据</button>

        
    </div>
};



