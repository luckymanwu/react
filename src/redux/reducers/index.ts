import { combineReducers } from "redux";
import { DiscussPost, DiscussPostState } from "./DiscussPost";
import { app, appState } from "./app";
import {Register,RegisterState} from './Register'
import {Login,LoginState} from './Login'
import {OperateResult,OperateResultState} from './OperateResult'
import {Setting,SettingState} from './Setting'
import {Profile,ProfileState} from './Profile'
import {DiscussPostDetail, DiscussPostDetailState } from "./DiscussPostDetail";
import {Letter, LetterState } from "./Letter";
import { LetterDetail,LetterDetailState } from "./LetterDetail";
import { ChatWidget,ChatWidgetState } from "./ChatWidget";
import {Follower,FollowerState} from './Follower'
import {Fans,FansState} from './Fans'
import {NoticeDetail,NoticeDetailState} from './NoticeDetail'
import {Notice,NoticeState} from './Notice'
import {Search,SearchState} from './Search'
import{MyPost,MyPostState} from './MyPost'
import{MyReply,MyReplyState} from './MyReply'
import {Statistics,StatisticsState} from './Statistics'
export * from "./DiscussPost";
export * from "./app";
export * from "./Register";
export * from "./Login";
export * from "./OperateResult";
export * from "./Setting";
export * from "./Profile";
export * from "./DiscussPostDetail";
export * from "./Letter";
export * from "./LetterDetail";
export * from "./ChatWidget";
export * from "./Fans";
export * from "./Follower";
export * from "./Notice";
export * from "./NoticeDetail";
export * from "./Search";
export * from "./MyPost";
export * from "./Statistics"
export * from './MyReply'
export interface StoreState {
	DiscussPost:DiscussPostState
	app:appState
	Register:RegisterState
	Login:LoginState
	OperateResult:OperateResultState
	Setting:SettingState
	Profile:ProfileState
	DiscussPostDetail:DiscussPostDetailState
	Letter:LetterState
	LetterDetail:LetterDetailState
	ChatWidget:ChatWidgetState
	Fans:FansState
	Follower:FollowerState
	Notice:NoticeState
	NoticeDetail:NoticeDetailState
	Search:SearchState
	MyPost:MyPostState
	Statistics:StatisticsState
	MyReply:MyReplyState


}
export const reducer = combineReducers<StoreState>({
	DiscussPost,
	app,
	Register,
	Login,
	OperateResult,
	Setting,
	Profile,
	DiscussPostDetail,
	Letter,
	LetterDetail,
	ChatWidget,
	Fans,
	Follower,
	Notice,
	NoticeDetail,
	Search,
	MyPost,
	Statistics,
	MyReply

});