import axios from "axios";
import qs from 'qs'
import { getCookieItem } from "../../utils";
import {UPDATE_CHATWIDGET_PROPS} from '../constant'
export const ChatWidgetActions = { 
 updateProps: (payload) => (dispatch) => {
      return dispatch({
       type: UPDATE_CHATWIDGET_PROPS,
        payload: payload,
      });
    },
 getLetterDetails:(conversationId)=>async(dispatch)=>{
    
      const res = await axios.get(`http://localhost:8030/community/getLetterDetails?conversationId=${conversationId}`);
      const {data,msg,code} = res.data
      if(code==0){
        let list:any =[];
        data.letters.map((item)=>{
          if(item.to_id == getCookieItem('userId')){
            list.push({
              position: 'left',
              type: 'text',
              text:item.content,
              date:item.create_time
            })
          }else{
            list.push({
              position: 'right',
              type: 'text',
              text:item.content,
              date:item.create_time
            })
          }
     
        })

          dispatch(ChatWidgetActions.updateProps({
              letters:list,
              letterNum:data.letterNum,
              
          }))
      }
   },
   sendMsg:(params)=>async(dispatch)=>{
    const res = await axios({ url: 'http://localhost:8030/community/addMessage', method: 'POST', withCredentials:true, data: qs.stringify(params) });
    const {data,msg,code} = res.data
   
 },
 readMsg:(conversationId,userId)=>async(dispatch)=>{
  const res = await axios.get(`http://localhost:8030/community/readMsg?conversationId=${conversationId}&userId=${userId}`);
 }
}