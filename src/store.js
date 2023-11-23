import {configureStore} from '@reduxjs/toolkit'
import reducer from "./slice.js"
import { checkMail } from './featchSliceApi';
import { setupListeners } from "@reduxjs/toolkit/query";
// console.log(reducer)
// console.log(counterSlice)
  const store= configureStore({
    reducer:
    {   
        [checkMail.reducerPath]:checkMail.reducer,
        slice : reducer
    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(checkMail.middleware),

});


setupListeners(store.dispatch);


export default store;