import { combineReducers } from "redux";
import {UPDATE_NOTICEDETAIL_PROPS} from '../constant'
export interface  NoticeDetailState{
    NoticeDetailProps:{
        NoticeDetails:any;
        page:any;
        size:any;
        NoticeDetailNum:any;
  
    }
}
export const NoticeDetail = combineReducers< NoticeDetailState>({
    NoticeDetailProps:(
        state={
            NoticeDetails:[],
            page:1,
            size:5,
            NoticeDetailNum:0
        },
        {payload,type}
    )=>{
        if(type !== UPDATE_NOTICEDETAIL_PROPS) return state;
        return { ...state, ...payload };
    },
    
})