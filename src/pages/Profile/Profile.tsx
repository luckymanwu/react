import * as React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { useDispatch, useSelector } from "react-redux";
import { StoreState, ProfileState } from "../../redux/reducers"; 
import { ProfileActions } from '../../redux/actions/Profile'
import {getCookieItem} from '../../utils'
import moment from "moment";
export interface ProfilePageProps extends RouteConfigComponentProps { }
export const ProfilePage: React.SFC<ProfilePageProps> = (props) => {
    const dispatch = useDispatch();
    const { ProfileProps } = useSelector<StoreState, ProfileState>(
      (state) => state.Profile
    );
	const targetId = props.location.search.split('=')[1]
	const userId = getCookieItem('userId');
	React.useEffect(() => {
		dispatch(ProfileActions.getProfile(userId,targetId));
      }, []);
    const {profile,isSubscribe} =ProfileProps
return(
      <div className="container">
				{/* <!-- 选项 --> */}
				<div className="position-relative">
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<a className="nav-link active" href="#Profile">个人信息</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="my-post.html">我的帖子</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="my-reply.html">我的回复</a>
						</li>
					</ul>
				</div>
				{/* <!-- 个人信息 --> */}
				<div className="media mt-5">
					<img src={profile.headUrl} className="align-self-start mr-4 rounded-circle" alt="用户头像" style={{width:"50px"}}/>
					<div className="media-body">
						<h5 className="mt-0 text-warning">
							<span>{profile.username}</span>
							<button onClick={()=>{
								if(!isSubscribe){
									dispatch(ProfileActions.subscribe(userId,targetId))
									dispatch(ProfileActions.updateProps({
									isSubscribe:true					
									}))
									profile.fans++
								}else{
									dispatch(ProfileActions.unSubscribe(userId,targetId))
									dispatch(ProfileActions.updateProps({
									isSubscribe:false					
									}))
									profile.fans--
								}
						
							}}
							type="button" className={isSubscribe?'btn btn-secondary btn-sm float-right mr-5 follow-btn':'btn btn-info btn-sm float-right mr-5 follow-btn'}>
								{isSubscribe?'已关注':'关注他'}</button>
						</h5>
						<div className="text-muted mt-3">
							<span>注册于 <i className="text-muted">{moment(profile.createTime).format('YYYY-MM-DD')}</i></span>
						</div>
						<div className="text-muted mt-3 mb-5">
							<span>关注了 <a className="text-primary" href={"#Follower?userId="+targetId+"&username="+profile.username}>{profile.followers}</a> 人</span>
							<span className="ml-4">关注者 <a className="text-primary" href={"#Fans?userId="+targetId+"&username="+profile.username}>{profile.fans}</a> 人</span>
							<span className="ml-4">获得了 <i className="text-danger">{profile.likes}</i> 个赞</span>
						</div>
					</div>
				</div>
			</div>		
   )
}  
