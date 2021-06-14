import { combineReducers } from "redux";
import {UPDATE_LETTER_DETAIL_PROPS} from '../constant'
export interface LetterDetailState {
    LetterDetailProps:{
        fromUsername:any;
        headUrl:any;
        conversatioId:any;
        letters:any;
        letterNum:any;
        page:any;
        size:any;

    }

}
export const LetterDetail= combineReducers<LetterDetailState>({
    LetterDetailProps:(
        state = {
            fromUsername:'',
            headUrl:'',
            conversatioId:null,
            letters:[],
            letterNum:null,
            page:1,
            size:5
        },
        { payload, type }
    )=> {
        if (type !== UPDATE_LETTER_DETAIL_PROPS) return state;
        return { ...state, ...payload };
    },
})