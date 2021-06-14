import {UPDATE_LETTER_DETAIL_PROPS} from '../constant'
import axios from "axios";
export const LetterDetailActions={
    updateProps:(payload) => dispatch =>{
        return dispatch({
            type:UPDATE_LETTER_DETAIL_PROPS,
            payload:payload,
        });
    },
    getLetterDetails:(conversationId,page,pageSize)=>async(dispatch)=>{
        const res = await axios.get(`http://localhost:8030/community/getLetterDetails?conversationId=${conversationId}&page=${page}&size=${pageSize}`);
        const {data,msg,code} = res.data
        if(code==0){
            dispatch(LetterDetailActions.updateProps({
                letters:data.letters,
                letterNum:data.letterNum,
                headUrl:data.headUrl,
                fromUsername:data.fromUsername
            }))

        }
}
}