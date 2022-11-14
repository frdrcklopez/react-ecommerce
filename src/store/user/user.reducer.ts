import { AnyAction } from 'redux'
import { signInSuccess, signInFailed, signupFailed, signOutSuccess, signOutFailed  } from './user.action'
import { UserData } from '../../utils/firebase/firebase.utils'

export type UserState = {
    readonly currentUser : UserData | null;
    readonly isLoading : boolean;
    readonly error : Error | null
}

const INITIAL_STATE : UserState = {
    currentUser : null,
    isLoading : false,
    error : null,
}

export const userReducer = (state = INITIAL_STATE, action = {} as AnyAction) => {

    if(signInSuccess.match(action)){
        return {
            ...state,
            currentState : action.payload
        }
    }

    if(signOutSuccess.match(action)){
        return {
            ...state,
            currentUser : null
        }
    }

    if(signInFailed.match(action) || signupFailed.match(action) ||signOutFailed.match(action) ){
        return {
            ...state, 
            error: action.payload 
        }
    }

    return state
}