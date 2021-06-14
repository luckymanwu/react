import { combineReducers } from "redux";
import {UPDATE_FANS_PROPS} from '../constant'
export interface FansState{
    FansProps:{
        page:any;
        size:any;
        Fans:any;
        FansNum:any;
        flag:any;
    }
}
export const Fans = combineReducers<FansState>({
    FansProps:(
        state={
        page:1,
        size:5,
        Fans:[],
        FansNum:null,
        flag:false
        },
        {payload,type}
    )=>{
        if(type !== UPDATE_FANS_PROPS) return state;
        return { ...state, ...payload };
    },
    
})