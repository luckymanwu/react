import {UPDATE_NOTICE_PROPS} from '../constant'
import axios from "axios";
export const NoticeActions={
    updateProps:(payload) => dispatch =>{
        return dispatch({
            type:UPDATE_NOTICE_PROPS,
            payload:payload,
        });
    },
    getNotices:(userId) => async(dispatch)=>{
        const res = await axios.get(`http://localhost:8030/community/getNotices?userId=${userId}`);
      const {data,msg,code} = res.data
      if(code==0){
         dispatch(NoticeActions.updateProps({
            likeNotice:data.like,
            followNotice:data.follow,
            commentNotice:data.comment,
            unreadTotal:data.unreadTotal
          }))
    }
 }
}