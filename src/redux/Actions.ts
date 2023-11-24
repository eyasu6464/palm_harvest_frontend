import { ADD_USER_INFORMATION } from "./ActionTypes";

export const add_user_information = (userinformation:any) => {
    return{
        type: ADD_USER_INFORMATION,
        payload: userinformation
    }
}