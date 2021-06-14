import axios from "axios";
import qs from 'qs'
import{appActions} from './app'
import {UPDATE_SETTINGS_PROPS} from '../constant'
import cookie from 'react-cookies'
export const SettingActions = {
    updateProps: (payload) => (dispatch) => {
        return dispatch({
          type: UPDATE_SETTINGS_PROPS,
          payload: payload,
        });
      },
    
    changePassword: (params)=> async (dispatch) =>{
      const res = await axios({ url: 'http://localhost:8030/community/user/changePassword', method: 'POST', data: qs.stringify(params) });
      const{data,msg,code} = res.data;
      if(code==0){
        cookie.remove('token')
        dispatch(appActions.updateProps({
          userAuth:false,
          user:{}
        }))
        window.location.href="#Login"
      }else{
        dispatch(SettingActions.updateProps({
          prompt:data.pwdError
        }))
      }  
      },

    }