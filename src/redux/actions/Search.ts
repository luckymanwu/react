import {UPDATE_SEARCH_PROPS} from '../constant'
import axios from "axios";
import qs from 'qs'
export const SearchActions={
    updateProps:(payload) => dispatch =>{
        return dispatch({
            type:UPDATE_SEARCH_PROPS,
            payload:payload,
        });
    },
    search:(key,page,size)=>async(dispatch)=>{
        const res = await axios.get(`http://localhost:8030/community/search?key=${key}&page=${page}&size=${size}`);
        const {data,msg,code} = res.data
        if(code==0){
            dispatch(SearchActions.updateProps({
                DiscussPosts:data
            }))  

        }
},
searchNum:(key)=>async(dispatch)=>{
    const res = await axios.get(`http://localhost:8030/community/searchNum?key=${key}`);
    const {data,msg,code} = res.data
    if(code==0){
        dispatch(SearchActions.updateProps({
            total:data
        }))  

}
}
}