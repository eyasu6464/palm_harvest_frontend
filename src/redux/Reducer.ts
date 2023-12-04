import { ADD_USER_INFORMATION, ADD_USERS_LIST, USER_LOGGED } from "./ActionTypes";

const initialStateUserInformation = {}
const initialStateUserList:any[] = []
const initialStateUserLogged:Boolean = true

export const addUserInformationReducer = ( state = initialStateUserInformation, action:any ) => {
    const { type, payload } = action
    switch(type){
        case ADD_USER_INFORMATION:
            return payload
        default:
            return state
    }
}

export const addUserListReducer = (state = initialStateUserList, action:any) => {
    const { type, payload } = action
    switch(type){
        case ADD_USERS_LIST:
            return payload
        default:
            return state
    }
}

export const isUserLoggedReduer = ( state= initialStateUserLogged, action:any ) => {
    const { type, payload } = action
    switch(type){
        case USER_LOGGED:
            return payload
        default:
            return state
    }
}