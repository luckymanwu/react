import axios from "axios";
import qs from 'qs'
import {UPDATE_DISCUSS_DETAIL_PROPS} from '../constant'
import { message } from 'antd';
export const DiscussDetailActions = {  
    updateProps: (payload) => (dispatch) => {
         return dispatch({
          type: UPDATE_DISCUSS_DETAIL_PROPS,
           payload: payload,
         });
       },
    getDiscussDetail:(PostId)=>async (dispatch) => {
        const res = await axios.get(`http://localhost:8030/community/getDiscussPost?PostId=${PostId}`);
        const {data,msg,code} = res.data
        if(code==0){
          dispatch(DiscussDetailActions.updateProps({
              discussPostDetail:data
          }));
        }      
       },
    getComments:(params)=>async (dispatch) => {
        const res = await axios({ url: 'http://localhost:8030/community/getDiscussPostComment', method: 'POST', withCredentials:true, data: qs.stringify(params) });
        const {data,msg,code} = res.data
        if(code==0){
          dispatch(DiscussDetailActions.updateProps({
             ctc:data.ctc,
             ctd:data.ctd,
             total:data.total
          }));

        }
       },
    addComment:(params) =>async(dispatch)=>{
        const res = await axios({ url: 'http://localhost:8030/community/addComment', method: 'POST', withCredentials:true, data: qs.stringify(params) });
        const {data,msg,code} = res.data
        if(code==0){
          dispatch(DiscussDetailActions.updateProps({
             total:data.num
          })
          )
          window.location.reload()
        }
       },
       like:(params) => async(dispatch) =>{
         let {like} =params
        const res = await axios({ url: 'http://localhost:8030/community/like', method: 'POST',  data: qs.stringify(params) });
        const {data,msg,code} = res.data
        if(code==0){
        dispatch(DiscussDetailActions.updateProps({
          like:data.entityLikes
       }))
      }
    },
    top:(params) =>async(dispatch)=>{
      const res = await axios({ url: 'http://localhost:8030/community/top', method: 'POST',  data: qs.stringify(params) });
      const {data,msg,code} = res.data
      if(code==0){
        message.success('operate successfully');
      }else{
        message.error('operation failure permission denied');
      }
 
    },
    wonderful:(params)=>async(dispatch)=>{
      const res = await axios({ url: 'http://localhost:8030/community/wonderful', method: 'POST',  data: qs.stringify(params) });
      const {data,msg,code} = res.data
      if(code==0){
        message.success('operate successfully');
      }else{
        message.error('operation failure permission denied');
      }
    },
    delete:(params)=>async(dispatch)=>{
      const res = await axios({ url: 'http://localhost:8030/community/delete', method: 'POST',  data: qs.stringify(params) });
      const {data,msg,code} = res.data
      if(code==0){
        message.success('operate successfully');
        window.location.href="#DiscussPost"
      }else{
        message.error('operation failure permission denied');
      }
    }

  }