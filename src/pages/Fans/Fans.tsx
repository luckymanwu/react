import * as React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { StoreState, FansState,appState} from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { ProfileActions } from '../../redux/actions/Profile'
import {FansActions} from '../../redux/actions/Fans'
import moment from "moment";
import{getCookieItem} from '../../utils'
import{Pagination } from 'antd'
export interface FansPageProps extends RouteConfigComponentProps {}
export const FansPage: React.SFC<FansPageProps> = (props) => {
	const userId = getCookieItem('userId');
	const targetId = props.location.search.split('=')[1].split('&')[0]
	const username = props.location.search.split('=')[2]
    const dispatch = useDispatch();
    const { FansProps } = useSelector<StoreState, FansState>(
        (state) => state.Fans
      );
	  const { appProps } = useSelector<StoreState, appState>(
        (state) => state.app
      )
	  const{page,size,Fans,FansNum,flag} = FansProps
	React.useEffect(()=>{
		let params={
			page,
			size,
			targetId,
			userId,
		}
		dispatch(FansActions.getFans(params))
		dispatch(FansActions.getFansNum(targetId))
	},[])
		
return(
	<div className="container">
				<div className="position-relative">
					{/* <!-- 选项 --> */}
					<ul className="nav nav-tabs mb-3">
						<li className="nav-item">
							<a className="nav-link position-relative active" href={"#Follower?userId="+targetId+"&username="+username}><i className="text-info">{username}</i> 关注的人</a>
						</li>
						<li className="nav-item">
							<a className="nav-link position-relative" href={"#Fans?userId="+targetId+"&username="+username}>关注 <i className="text-info">{username}</i> 的人</a>
						</li>
					</ul>
					<a href="#Profile" className="text-muted position-absolute rt-0">返回个人主页&gt;</a>
				</div>
				
		
				<ul className="list-unstyled">
					{Fans.map((item)=>{
						return (
							<li className="media pb-3 pt-3 mb-3 border-bottom position-relative">
						<a href="profile.html">
							<img src={item.fans.header_url}className="mr-4 rounded-circle user-header" alt="用户头像" />
						</a>
						<div className="media-body">
							<h6 className="mt-0 mb-3">
								<span className="text-success">{item.fans.username}</span>
								<span className="float-right text-muted font-size-12">关注于{moment(item.followTime).format('YYYY-MM-DD')} <i></i></span>
							</h6>
							<div>
								<button onClick={(e)=>{
								if(!item.hasFollowed){
									dispatch(ProfileActions.subscribe(userId,item.fans.id))	
									item.hasFollowed=true
									dispatch(FansActions.updateProps({
										flag:!flag	
									}))
								

								}else{
									dispatch(ProfileActions.unSubscribe(userId,item.fans.id))
									item.hasFollowed=false		
									dispatch(FansActions.updateProps({
										flag:!flag	
									}))				
								}
						
							}}
							type="button" className={item.hasFollowed?'btn btn-secondary btn-sm float-right mr-5 follow-btn':'btn btn-info btn-sm float-right mr-5 follow-btn'}>
							{item.hasFollowed?'已关注':'关注他'}</button>
							</div>
						</div>
					</li>)

					})}
														
				</ul>
				{/* <!-- 分页 --> */}
				<nav className="mt-5">
				<Pagination showQuickJumper total={FansNum}
                            current={page}
                            defaultPageSize={5}
                            showTotal={FansNum => `Total ${FansNum} items`}
                            onChange={(page, pageSize) => {
                               dispatch( FansActions.updateProps({ page: page, size: pageSize }))
							   let params={
								page,
								size,
								targetId,
			                    userId,
							   }
                               dispatch(FansActions.getFans(params)) 
                            }
                            } />
					
				</nav>
			</div>
 )
}