import axios from "axios";
import qs from 'qs'
import { getCookieItem } from "../../utils";
import {UPDATE_FOLLOWER_PROPS} from '../constant'
export const FollowerActions = { 
 updateProps: (payload) => (dispatch) => {
      return dispatch({
       type: UPDATE_FOLLOWER_PROPS,
        payload: payload,
      });
    },
    getFollower:(params)=>async(dispatch)=>{
      const res = await axios({ url: 'http://localhost:8030/community/getFollowers', method: 'POST', withCredentials:true, data: qs.stringify(params) });
      const {data,msg,code} = res.data
      dispatch(FollowerActions.updateProps({
        Follower:data
      }))
      
    },
    getFollowerNum:(userId)=>async(dispatch)=>{
      const res = await axios.get(`http://localhost:8030/community/getFollowersNum?userId=${userId}`);
      const {data,msg,code} = res.data
      if(code==0){
        dispatch(FollowerActions.updateProps({
          FollowerNum:data
        }))
      }

    }

}