import { combineReducers } from "redux";
import {UPDATE_DISCUSS_PROPS} from '../constant'
export interface DiscussPostState {
DiscussPostProps:{
    userId:any;
    page:any;
    size:any;
    alldiscussPost: any;
    discussPostCount: any;
    title:any;
    content:any;
    ispublish:boolean;
   
  }
} 
export const DiscussPost = combineReducers<DiscussPostState>({
    DiscussPostProps:(
        state = {
            userId:0,
            page:1,
            size:10,
            alldiscussPost:[],
            discussPostCount:null,
            title:'',
            content:'',
            ispublish:false,
        },
        { payload, type }
    )=> {
        if (type !== UPDATE_DISCUSS_PROPS) return state;
        return { ...state, ...payload };
    },
})