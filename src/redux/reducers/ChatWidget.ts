import { combineReducers } from "redux";
import {UPDATE_CHATWIDGET_PROPS} from '../constant'
export interface ChatWidgetState{
    ChatWidgetProps:{
    fromUsername:any;
        headUrl:any;
        letterNum:any;
        conversatioId:any;
        letters:any;
        sendMsg:any;
    }
}
export const ChatWidget = combineReducers<ChatWidgetState>({
    ChatWidgetProps:(
        state={
            fromUsername:'',
            headUrl:'',
            letterNum:null,
            conversatioId:null,
            letters:[],     
            sendMsg:''
        },
        {payload,type}
    )=>{
        if(type !== UPDATE_CHATWIDGET_PROPS) return state;
        return { ...state, ...payload };
    },
    
})