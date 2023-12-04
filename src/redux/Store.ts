import { combineReducers, createStore } from "redux";
import {composeWithDevTools} from '@redux-devtools/extension';

import { addUserInformationReducer, addUserListReducer, isUserLoggedReduer } from "./Reducer";

const reducers = combineReducers(
    {
        userInformation:addUserInformationReducer,
        userList:addUserListReducer,
        userLogged: isUserLoggedReduer,
    }
);

export const store = createStore(reducers, composeWithDevTools())