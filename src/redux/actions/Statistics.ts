import {UPDATE_STATISTICS_PROPS} from '../constant'
import axios from "axios";
import qs from 'qs'
export const StatisticsActions={
    updateProps:(payload) => dispatch =>{
        return dispatch({
            type:UPDATE_STATISTICS_PROPS,
            payload:payload,
        });
    },
    getUV:(start,end)=>async(dispatch)=>{
        const res = await axios.get(`http://localhost:8030/community/getUV?start=${start}&end=${end}`);
        const {data,msg,code} = res.data
        if(code==0){
            dispatch(StatisticsActions.updateProps({
                UV:data
             }))
     }
  },
 getDAU:(start,end)=>async(dispatch)=>{
    const res = await axios.get(`http://localhost:8030/community/getDAU?start=${start}&end=${end}`);
    const {data,msg,code} = res.data
    if(code==0){
        dispatch(StatisticsActions.updateProps({
            DAU:data
        }))
}
}
}