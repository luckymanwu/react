import { combineReducers } from "redux";
import {UPDATE_REGISTER_PROPS} from '../constant'
export interface RegisterState {
RegisterProps:{
     userNamePrompt:any,
     passwordPrompt:any,
     emailPrompt:any,
     confirmPasswordPrompt:any
     prompt:any,
     username:any,
     password:any,
     email:any,
     Jumpurl:string,
     JumpPrompt:any
  }
} 
export const Register = combineReducers<RegisterState>({
    RegisterProps:(
        state = {
            userNamePrompt:'',
            passwordPrompt:'',
            emailPrompt:'',
            confirmPasswordPrompt:'',
            username:'',
            password:'',
            email:'',
            Jumpurl:'',
            JumpPrompt:'',
            prompt:''
        },
        { payload, type }
    )=> {
        if (type !== UPDATE_REGISTER_PROPS) return state;
        return { ...state, ...payload };
    },
})