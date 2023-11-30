import { combineReducers, createStore } from "redux";
import {composeWithDevTools} from '@redux-devtools/extension';

import { addUserInformationReducer, addUserListReducer } from "./Reducer";

const reducers = combineReducers(
    {
        userInformation:addUserInformationReducer,
        userList:addUserListReducer
    }
);

export const store = createStore(reducers, composeWithDevTools())