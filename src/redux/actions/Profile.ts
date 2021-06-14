import {UPDATE_PROFILE_PROPS} from '../constant'
import axios from "axios";
export const ProfileActions={
    updateProps:(payload) => dispatch =>{
        return dispatch({
            type:UPDATE_PROFILE_PROPS,
            payload:payload,
        });
    },
    getProfile:(userId,targetId)=>async(dispatch)=>{
        const res = await axios.get(`http://localhost:8030/community/getProfile?userId=${userId}&targetId=${targetId}`);
        const {data,msg,code} = res.data
        if(code==0){
            dispatch(ProfileActions.updateProps({
                profile:data.profile,
                isSubscribe:data.isSubscribe
            }))
        }

    },
    subscribe:(userId,targetId)=>async(dispatch)=>{
        const res = await axios.get(`http://localhost:8030/community/subscribe?userId=${userId}&targetId=${targetId}`);
    },

    unSubscribe:(userId,targetId)=>async(dispatch)=>{
    const res = await axios.get(`http://localhost:8030/community/unsubscribe?userId=${userId}&targetId=${targetId}`);
    }
}