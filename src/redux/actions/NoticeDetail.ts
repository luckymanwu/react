import {UPDATE_NOTICEDETAIL_PROPS} from '../constant'
import qs from 'qs'
import axios from "axios";
export const NoticeDetailActions={
    updateProps:(payload) => dispatch =>{
        return dispatch({
            type:UPDATE_NOTICEDETAIL_PROPS,
            payload:payload,
        });
    },
    getNoticeDetails:(params)=>async(dispatch)=>{
        const res = await axios({ url: 'http://localhost:8030/community/getNoticeDetail', method: 'POST', withCredentials:true, data: qs.stringify(params) });
        const {data,msg,code} = res.data
        if(code==0){
           dispatch(NoticeDetailActions.updateProps({
               NoticeDetails:data
    }))

    }
 },
 getNoticeDetailNums:(userId,conversationId)=>async(dispatch)=>{
    const res = await axios.get(`http://localhost:8030/community/getNoticeDetailNums?userId=${userId}&conversationId=${conversationId}`);
    const {data,msg,code} = res.data
    if(code==0){
        dispatch(NoticeDetailActions.updateProps({
            NoticeDetailNum:data
 }))
 }
}
}