import { combineReducers } from "redux";
import {UPDATE_FOLLOWER_PROPS} from '../constant'
export interface FollowerState{
    FollowerProps:{
        page:any;
        size:any;
        Follower:any;
        FollowerNum:number;
        flag:any;

    }
}
export const Follower = combineReducers<FollowerState>({
    FollowerProps:(
        state={
            page:1,
            size:5,
            Follower:[],
            FollowerNum:0,
            flag:false
            
    
        },
        {payload,type}
    )=>{
        if(type !== UPDATE_FOLLOWER_PROPS) return state;
        return { ...state, ...payload };
    },
    
})