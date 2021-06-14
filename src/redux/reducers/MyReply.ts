import { combineReducers } from "redux";
import {UPDATE_STATISTICS_PROPS} from '../constant'
export interface MyReplyState{
    MyReplyProps:{
    
    }
}
export const MyReply = combineReducers<MyReplyState>({
    MyReplyProps:(
       state={
         
        },
        { payload, type }
        ) => {
          if (type !== UPDATE_STATISTICS_PROPS) return state;
          return { ...state, ...payload };
        }
      });