import isPromise from "./isPromise";

export default (dispatch) => {
    return function(action) {
      if (isPromise(action.payload) ){

            dispatch({ type: "loading_start" });
            action.payload.then(v => {

                dispatch({ type: action.type, payload: v });
                dispatch({ type: "loading_end" });
        });
      } else {
            dispatch(action);
      }
    };
  }