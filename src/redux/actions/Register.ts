import axios from "axios";
import qs from 'qs'
import {UPDATE_REGISTER_PROPS} from '../constant'
export const RegisterActions = {
  updateProps: (payload) => (dispatch) => {
      return dispatch({
        type: UPDATE_REGISTER_PROPS,
        payload: payload,
      });
    },

checkUsername:(params) => async(dispatch) =>{
    const res = await axios({ url: 'http://localhost:8030/community/user/checkUserName', method: 'POST',withCredentials:true,
    data: qs.stringify(params)});
    const {data,msg,code} = res.data
    if(code===1){
        dispatch(RegisterActions.updateProps({
            userNamePrompt: data,
            }));
    }if(code===0){
        dispatch(RegisterActions.updateProps({
            userNamePrompt: '',
            username: params.username
            }));
    }
},
checkUserEmail:(params)=> async (dispatch) => {
    const res = await axios({ url: 'http://localhost:8030/community/user/checkUserEmail', method: 'POST', withCredentials:true, 
    data: qs.stringify(params)});
    const {data,msg,code} = res.data
    if(code===1){
        dispatch(RegisterActions.updateProps({
            emailPrompt: data,
            }));
    }if(code===0){
        dispatch(RegisterActions.updateProps({
            emailPrompt: '',
            email:params.email
            }));     
    }
  },
  register:(params) => async (dispatch) => {
    const res = await axios({ url: 'http://localhost:8030/community/user/register', method: 'POST', data: qs.stringify(params) });
    const{data,msg,code} = res.data;
    if(code===0){
        console.log(111)
        window.location.href='#OperateResult';
    }else{
        dispatch(RegisterActions.updateProps({
            prompt: '注册失败',
            }));  
    }

}
}

 