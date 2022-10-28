import { configureStore} from "@reduxjs/toolkit";
import { reducer } from "./AddDataSlice";
import { reducer1 } from "./AuthenticationSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { reducer3 } from "./PostSlice";


const store= configureStore({
    reducer:{
        addDetails:reducer,
        authSite:reducer1,
        posts:reducer3
    },
    middleware: [thunk,logger]
})



export default store