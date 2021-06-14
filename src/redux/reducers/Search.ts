import { combineReducers } from "redux";
import {UPDATE_SEARCH_PROPS} from '../constant'

export interface SearchState{
    SearchProps:{
      DiscussPosts:any;
      key:any;
      page:any;
      size:any;
      total:any;
      
      
    };
}

export const Search = combineReducers<SearchState>({
    SearchProps:(
       state={
        DiscussPosts:[],
        key:'',
        page:1,
        size:10,
        total:0
        },
        { payload, type }
        ) => {
          if (type !== UPDATE_SEARCH_PROPS) return state;
          return { ...state, ...payload };
        }
      });