import {UPDATE_OPERATERESULT_PROPS} from '../constant'
import axios from "axios";
import qs from 'qs'
export const OperateResultActions={
    updateProps:(payload) => dispatch =>{
        return dispatch({
            type:UPDATE_OPERATERESULT_PROPS,
            payload:payload,
        });
    },
    activate:(params) =>async (dispatch) =>{
        console.log(params)
        const res = await axios({ url: 'http://localhost:8030/community/activate', method: 'POST', data: qs.stringify(params) });
        const {data,msg,code} = res.data
        dispatch(OperateResultActions.updateProps({
                prompt:data
            }))
     
        
    }

}
