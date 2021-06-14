import { combineReducers } from "redux";
import {UPDATE_NOTICE_PROPS} from '../constant'
export interface  NoticeState{
    NoticeProps:{
        commentNotice:any;
        likeNotice:any;
        followNotice:any;
        unreadTotal:any;
        
        
    }
}
export const Notice = combineReducers< NoticeState>({
    NoticeProps:(
        state={
            commentNotice:{},
            likeNotice:{},
            followNotice:{},
            unreadTotal:0
        },
        {payload,type}
    )=>{
        if(type !== UPDATE_NOTICE_PROPS) return state;
        return { ...state, ...payload };
    },
    
})