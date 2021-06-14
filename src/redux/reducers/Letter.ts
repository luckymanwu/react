import {UPDATE_LETTER_PROPS} from '../constant'
import { combineReducers } from "redux";
export interface LetterState{
    LetterProps:{
        conversations:any;
        page:any;
        size:any;
        conversationCount:any;
        unreadTotal:any;
        fromUsername:any;
        headUrl:any;
        conversatioId:any;
        resModalVisible:any;
        toUserName:any;
        content:any;
    }
}
export const Letter = combineReducers<LetterState>({
    LetterProps:(
        state={
            conversations:[],
            page:1,
            size:5,
            conversationCount:null,
            unreadTotal:null,
            fromUsername:'',
            headUrl:'',
            conversatioId:'',
            resModalVisible:false,
            toUserName:'',
            content:''
        },
        { payload, type }
    )=>{
        if (type !== UPDATE_LETTER_PROPS) return state;
        return { ...state, ...payload };
    },
})