import {UPDATE_APP_PROPS} from '../constant'
import axios from "axios";
import qs from 'qs'
import {DiscussActions} from './DiscussPost'
export const appActions={
    updateProps:(payload) => dispatch =>{
        return dispatch({
            type:UPDATE_APP_PROPS,
            payload:payload,
        });
    },
  getMenu:() =>async(dispatch) =>{
    let url = `http://localhost:8030/community/getMenu`;
    const res = await axios.get(url);
    const { code, data, msg } = res.data;
    if(code==0){
      dispatch(appActions.updateProps({
        user:data.user,
        isLogin:data.isLogin
      }))
             
    }

  }
 
   
}
