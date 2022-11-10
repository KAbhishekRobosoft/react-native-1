import { configureStore} from "@reduxjs/toolkit";
import { reducer } from "./FavouriteSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { reducer3 } from "./citySlice";


const persistConfig= {
    key:"root",
    version:1,
    storage:AsyncStorage,
}

const reducer2= combineReducers({
    addFavourites:reducer,
    city:reducer3
})

const persistedReducer= persistReducer(persistConfig,reducer2)

const store= configureStore({
    reducer:persistedReducer,
    middleware: [thunk,logger]
})

export default store