import { combineReducers } from "redux";
import {UPDATE_PROFILE_PROPS} from '../constant'

export interface ProfileState{
  ProfileProps:{
      profile:any
      isSubscribe:boolean;
      
    };
}

export const Profile = combineReducers<ProfileState>({
    ProfileProps:(
       state={
        profile:{},
        isSubscribe:false
        },
        { payload, type }
        ) => {
          if (type !== UPDATE_PROFILE_PROPS) return state;
          return { ...state, ...payload };
        }
      });