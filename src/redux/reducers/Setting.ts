import { combineReducers } from "redux";
import {UPDATE_SETTINGS_PROPS} from '../constant'
export interface SettingState {
    SettingProps:{
        password:any,
        newPassword:any,
        prompt:any,
        loading:boolean,
        imageUrl:any
    }
}
export const Setting = combineReducers<SettingState>({
    SettingProps:(
        state ={
            password:'',
            newPassword:'',
            prompt:'',
            loading:false,
            imageUrl:null
        }, { payload, type }
    )=> {
        if (type !== UPDATE_SETTINGS_PROPS) return state;
        return { ...state, ...payload };
    },
})