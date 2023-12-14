import { ADD_USER_INFORMATION, ADD_USERS_LIST, USER_LOGGED, PALM_IMAGE_DETAILS } from "./ActionTypes";

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

export const is_user_logged = (user:any) => {
    return{
        type: USER_LOGGED,
        payload: user
    }
}

export const add_palm_image_details = (imagedetails:any) => {
    return{
        type: PALM_IMAGE_DETAILS,
        payload: imagedetails
    }
}