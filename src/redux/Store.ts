import { combineReducers, createStore } from "redux";
import {composeWithDevTools} from '@redux-devtools/extension';

import { addUserInformationReducer } from "./Reducer";

const reducers = combineReducers(
    {
        userInformation:addUserInformationReducer,
    }
);

export const store = createStore(reducers, composeWithDevTools())