import {UPDATE_MYPOST_PROPS} from '../constant'
import axios from "axios";
import qs from 'qs'
export const MyPostActions={
    updateProps:(payload) => dispatch =>{
        return dispatch({
            type:UPDATE_MYPOST_PROPS,
            payload:payload,
        });
    }
}