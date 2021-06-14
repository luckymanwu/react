import axios from "axios";
import qs from 'qs'
import { getCookieItem } from "../../utils";
import {UPDATE_FANS_PROPS} from '../constant'
export const FansActions = { 
 updateProps: (payload) => (dispatch) => {
      return dispatch({
       type: UPDATE_FANS_PROPS,
        payload: payload,
      });
    },
  
    getFans:(params)=>async(dispatch)=>{
      const res = await axios({ url: 'http://localhost:8030/community/getFans', method: 'POST', withCredentials:true, data: qs.stringify(params) });
      const {data,msg,code} = res.data
      dispatch(FansActions.updateProps({
        Fans:data
      }))
      
    },
    getFansNum:(userId)=>async(dispatch)=>{
      const res = await axios.get(`http://localhost:8030/community/getFansNum?userId=${userId}`);
      const {data,msg,code} = res.data
      if(code==0){
        dispatch(FansActions.updateProps({
          FansNum:data
        }))
      }

    }
}