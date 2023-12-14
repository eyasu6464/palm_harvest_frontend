import { combineReducers, createStore } from "redux";
import {composeWithDevTools} from '@redux-devtools/extension';

import { addUserInformationReducer, addUserListReducer, isUserLoggedReduer, addPalmImageDetailsReducer } from "./Reducer";

const reducers = combineReducers(
    {
        userInformation:addUserInformationReducer,
        userList:addUserListReducer,
        userLogged: isUserLoggedReduer,
        palmImageDetails:addPalmImageDetailsReducer,
    }
);

export const store = createStore(reducers, composeWithDevTools())