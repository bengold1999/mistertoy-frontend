import { userService } from "../../services/user.service.js"

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'


export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'


const initialState = {
    // count: 105,
    loggedInUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
 


        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            }
        case SET_USER_SCORE:
            const loggedInUser = { ...state.loggedInUser, score: action.score }
            return { ...state, loggedInUser }
        default:
            return state;
    }
}