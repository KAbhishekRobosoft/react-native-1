import { configureStore} from "@reduxjs/toolkit";
import { reducer } from "./AddDataSlice";
import { reducer1 } from "./AuthenticationSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { reducer3 } from "./PostSlice";
import { reducer4 } from "./userSlice";



const persistConfig= {
    key:"root",
    version:1,
    storage:AsyncStorage
}

const AuthConfig= {
    key:"authSite",
    storage:AsyncStorage,
    whitelist:["mPin"]
}

const PostConfig= {
    key:"postSite",
    storage:AsyncStorage,
    whitelist:["user"]
}

const UserConfig= {
    key:"userSite",
    storage:AsyncStorage,
    whitelist:["userId"]
}


const reducer2= combineReducers({
    addDetails:reducer,
    authSite:persistReducer(AuthConfig,reducer1),
    posts:persistReducer(PostConfig,reducer3),
    users:persistReducer(UserConfig,reducer4),
})

const persistedReducer= persistReducer(persistConfig,reducer2)

const store= configureStore({
    reducer:persistedReducer,
    middleware: [thunk,logger]
})



export default store