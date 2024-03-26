import { toyService } from "../../services/toy.service.js"


export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOY_UNDO = 'TOY_UNDO'


export const TOGGLE_toyT_IS_SHOWN = 'TOGGLE_toyT_IS_SHOWN'
export const ADD_TOY_TO_toyT = 'ADD_TOY_TO_toyT'
export const REMOVE_TOY_FROM_toyT = 'REMOVE_TOY_FROM_toyT'
export const CLEAR_toyT = 'CLEAR_toyT'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [],
    istoyShown: false,
    shoppingtoy: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    sortBy: toyService.getDefaultSort(),
    lasttoys: []
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY:
            const lasttoys = [...state.toys]
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== action.toyId),
                lasttoys
            }
        case ADD_TOY:

            return {
                ...state,
                toys: [action.toy,...state.toys]
            }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            }

        case TOGGLE_toyT_IS_SHOWN:
            return { ...state, istoyShown: !state.istoyShown }

        case ADD_TOY_TO_toyT:
            return {
                ...state,
                shoppingtoy: [...state.shoppingtoy, action.toy]
            }

        case REMOVE_TOY_FROM_toyT:
            const shoppingtoy = state.shoppingtoy.filter(toy => toy._id !== action.toyId)
            return { ...state, shoppingtoy }


        case CLEAR_toyT:
            return { ...state, shoppingtoy: [] }

        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case TOY_UNDO:
            return {
                ...state,
                toys: [...state.lasttoys]
            }


        default:
            return state
    }
}