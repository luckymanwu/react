import {UPDATE_LETTER_PROPS} from '../constant'
import axios from "axios";
import qs from 'qs'
export const LetterActions={
    updateProps:(payload) => dispatch =>{
        return dispatch({
            type:UPDATE_LETTER_PROPS,
            payload:payload,
        });
    },
    getConversations:(page,pageSize)=>async(dispatch)=>{
        const res = await axios.get(`http://localhost:8030/community/getConversations?page=${page}&size=${pageSize}`);
        const {data,msg,code} = res.data
        if(code==0){
            dispatch(LetterActions.updateProps({
                conversations:data.conversations,
                conversationCount:data.conversationCount,
                unreadTotal:data.unreadTotal
            }))

        }
    },
    sendMessage:(params)=>async(dispatch)=>{
        const res = await axios({ url: 'http://localhost:8030/community/sendMessage', method: 'POST', withCredentials:true, data: qs.stringify(params) });
        const {data,msg,code} = res.data

  }
}  