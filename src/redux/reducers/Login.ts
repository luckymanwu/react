import {UPDATE_LOGIN_PROPS} from '../constant'
import { combineReducers } from "redux";
export interface LoginState{
    LoginProps:{
        username:any
        password:any
        authCode:any
        authImage:any
        prompt:any
        authcodePrompt:any
    }
}
export const Login = combineReducers<LoginState>({
    LoginProps:(
        state = {
            username:'',
            password:'',
            authCode:'',
            authImage:'',
            prompt:'',
            authcodePrompt:''
        },
        { payload, type }
    )=> {
        if (type !== UPDATE_LOGIN_PROPS) return state;
        return { ...state, ...payload };
    },
    
})
