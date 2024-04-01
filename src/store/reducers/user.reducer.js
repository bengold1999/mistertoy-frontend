import { userService } from "../../services/user.service.js"

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'


export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'


const initialState = {
    // count: 105,
    loggedInUser: userService.getLoggedinUser(),
    users: [],
    watchedUser: null

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

        case SET_WATCHED_USER:
            return { ...state, watchedUser: action.user }
        case SET_USERS:
            return { ...state, users: action.users }

        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }

        default:
            return state;
    }
}