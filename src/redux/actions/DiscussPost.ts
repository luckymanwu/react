import axios from "axios";
import qs from 'qs'
import {UPDATE_DISCUSS_PROPS} from '../constant'
export const DiscussActions = {  
 updateProps: (payload) => (dispatch) => {
      return dispatch({
       type: UPDATE_DISCUSS_PROPS,
        payload: payload,
      });
    },
getAllDiscuss:(params)=> async (dispatch) => {
    const res = await axios({ url: 'http://localhost:8030/community/getDiscussPostVo', method: 'POST', withCredentials:true, data: qs.stringify(params) });
    const {data,msg,code} = res.data
    if(code===0){
          // 数据存在data的count里面
     dispatch(DiscussActions.updateProps({
      discussPostCount: data.count,
      }));
      
      // 将所有数据以allConfiguration存在store里
      dispatch(DiscussActions.updateProps({
        alldiscussPost: data.discussPosts
      }));
    }
  },
  publishDiscussPost:(params) => async(dispatch) =>{
    const{title,content} = params
    const res = await axios({ url: 'http://localhost:8030/community/publishDiscussPost', method: 'POST',  data: qs.stringify({title,content}) });
    const {data,msg,code} = res.data
    if(code==0){
      dispatch(DiscussActions.updateProps({
        ispublish: true
      }));
    }
  
  }

}
 