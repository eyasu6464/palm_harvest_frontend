import { ADD_USER_INFORMATION, ADD_USERS_LIST } from "./ActionTypes";

export const add_user_information = (userinformation:any) => {
    return{
        type: ADD_USER_INFORMATION,
        payload: userinformation
    }
}

export const add_user_list = (userlist:any) => {
    return{
        type: ADD_USERS_LIST,
        payload: userlist
    }
}