import { combineReducers } from "redux";
import {UPDATE_MYPOST_PROPS} from '../constant'
export interface MyPostState{
    MyPostProps:{
    
    }
}
export const MyPost = combineReducers<MyPostState>({
    MyPostProps:(
       state={
         
        },
        { payload, type }
        ) => {
          if (type !== UPDATE_MYPOST_PROPS) return state;
          return { ...state, ...payload };
        }
      });