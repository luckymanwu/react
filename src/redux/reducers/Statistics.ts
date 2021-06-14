import { combineReducers } from "redux";
import {UPDATE_STATISTICS_PROPS} from '../constant'
import { getCookieItem } from '../../utils';
export interface StatisticsState{
    StatisticsProps:{
      start:any;
      end:any;
      UV:any;
      DAU:any;
    
    };
}
export const  Statistics= combineReducers<StatisticsState>({
    StatisticsProps:(
       state={
        start:null,
        end:null,
        UV:0,
        DAU:0

         
        },
        { payload, type }
        ) => {
          if (type !== UPDATE_STATISTICS_PROPS) return state;
          return { ...state, ...payload };
        }
      });