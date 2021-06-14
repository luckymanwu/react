import { combineReducers } from "redux";
import {UPDATE_OPERATERESULT_PROPS} from '../constant'
export interface OperateResultState {
    OperateResultProps:{
    prompt:any
  }
} 
export const OperateResult = combineReducers<OperateResultState>({
    OperateResultProps:(
        state = {
         prompt:'注册成功,我们已经向您的邮箱发送了激活码，请注意查收'
        },
        { payload, type }
    )=> {
        if (type !== UPDATE_OPERATERESULT_PROPS) return state;
        return { ...state, ...payload };
    },
})