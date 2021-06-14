import { combineReducers } from "redux";
import {UPDATE_DISCUSS_DETAIL_PROPS} from '../constant'
export interface DiscussPostDetailState {
DiscussPostDetailProps:{
    discussPostDetail:any;
    page:any;
    size:any;
    postId:any;
    ctc:any;
    ctd:any;
    total:any;
    comment:any;
    like:any;
}
}
export const DiscussPostDetail = combineReducers<DiscussPostDetailState>({
    DiscussPostDetailProps:(
        state = {
            discussPostDetail:{},
            page:1,
            size:2,
            postId:null,
            ctc:[],
            ctd:[],
            total:0,
            comment:'',
            like:0,
            
        },
        { payload, type }
    )=> {
        if (type !== UPDATE_DISCUSS_DETAIL_PROPS) return state;
        return { ...state, ...payload };
    },
})