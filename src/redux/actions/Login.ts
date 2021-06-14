import {UPDATE_LOGIN_PROPS} from '../constant'
import axios from "axios";
import qs from 'qs'
import{appActions} from './app'


export const LoginActions={
    updateProps:(payload) => dispatch =>{
        return dispatch({
            type:UPDATE_LOGIN_PROPS,
            payload:payload,
        });
    },
    login:(params) => async(dispatch) =>{
        const res = await axios({ url: 'http://localhost:8030/community/user/login', method: 'POST', data: qs.stringify(params) });
        const{data,msg,code} = res.data;
        if(code==0){
            dispatch(appActions.getMenu())
            window.location.href="#DiscussPost"
        } else{
            dispatch(LoginActions.updateProps({
                prompt:data.Error
              }))
        }
       },
    getAuthCode:()=> async(dispatch) =>{
        const res = await axios({ url: 'http://localhost:8030/community/user/getAuthCode', method: 'GET' });
        const{data,msg,code} = res.data;
        if(code==0){
           dispatch(LoginActions.updateProps({
            authCode:data.VerificationCode,
            authImage:data.image
           })
            )
        }
    }
}
