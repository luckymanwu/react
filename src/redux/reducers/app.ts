import { combineReducers } from "redux";
import {UPDATE_APP_PROPS} from '../constant'
import { getCookieItem } from '../../utils';

export interface appState{
    appProps:{
        isLogin:boolean;
        key:any;
        user:any;
        page:any;
        size:any;
      
    };
}

export const app = combineReducers<appState>({
    appProps:(
       state={
            isLogin: false,
            key:'',
            user:{},
            page:1,
            size:10
        },
        { payload, type }
        ) => {
          if (type !== UPDATE_APP_PROPS) return state;
          return { ...state, ...payload };
        }
      });