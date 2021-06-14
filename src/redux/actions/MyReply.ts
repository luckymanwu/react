import {UPDATE_MYREPLY_PROPS} from '../constant'
import axios from "axios";
import qs from 'qs'
export const MyReplyActions={
    updateProps:(payload) => dispatch =>{
        return dispatch({
            type:UPDATE_MYREPLY_PROPS,
            payload:payload,
        });
    }
}