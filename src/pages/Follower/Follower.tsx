import * as React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { StoreState, FollowerState,appState } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import {FollowerActions} from '../../redux/actions/Follower'
import {ProfileActions} from '../../redux/actions/Profile'
import moment from "moment";
import{getCookieItem} from '../../utils'
import{Pagination } from 'antd'
export interface FansPageProps extends RouteConfigComponentProps { }
export const FollowerPage: React.SFC<FansPageProps> = (props) => {
    const userId = getCookieItem('userId');
	const targetId = props.location.search.split('=')[1].split('&')[0]
	const username = props.location.search.split('=')[2]
    const dispatch = useDispatch();
    const { FollowerProps } = useSelector<StoreState, FollowerState>(
        (state) => state.Follower
      );
      const { appProps } = useSelector<StoreState, appState>(
        (state) => state.app
      )
      let{page,size,Follower,FollowerNum,flag} = FollowerProps
      const{user} =  appProps
      React.useEffect(()=>{
		let params={
            page,
			size,
			targetId,
			userId,
		}
		dispatch(FollowerActions.getFollower(params))
		dispatch(FollowerActions.getFollowerNum(targetId))
	},[])
      return(
        <div className="container">
        <div className="position-relative">
            {/* <!-- 选项 --> */}
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <a className="nav-link position-relative" href={"#Follower?userId="+targetId+"&username="+username}><i className="text-info">{username}</i> 关注的人</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link position-relative active" href={"#Fans?userId="+targetId+"&username="+username}>关注 <i className="text-info">{username}</i> 的人</a>
                </li>
            </ul>
            <a href="#Profile" className="text-muted position-absolute rt-0">返回个人主页&gt;</a>
        </div>
        
    
        <ul className="list-unstyled">
            {Follower.map((item)=>{
                return(
                    <li className="media pb-3 pt-3 mb-3 border-bottom position-relative">
                <a href="profile.html">
                    <img src={item.Follower.header_url} className="mr-4 rounded-circle user-header" alt="用户头像" />
                </a>
                <div className="media-body">
                    <h6 className="mt-0 mb-3">
                        <span className="text-success">{item.Follower.username}</span>
                        <span className="float-right text-muted font-size-12">关注于 <i>{moment(item.followTime).format('YYYY-MM-DD')}</i></span>
                    </h6>
                    <div>
                    <button onClick={()=>{
								if(!item.hasFollowed){
									dispatch(ProfileActions.subscribe(userId,item.Follower.id))
                                    item.hasFollowed=true
                                    if(userId===targetId){
                                        dispatch(FollowerActions.updateProps({
                                            FollowerNum:++FollowerNum
                                        }))
                                    }
                                    dispatch(FollowerActions.updateProps({
										flag:!flag	
									}))	
                                  
								}else{
									dispatch(ProfileActions.unSubscribe(userId,item.Follower.id))
                                    item.hasFollowed=false
                                    if(userId===targetId){
                                        dispatch(FollowerActions.updateProps({
                                            FollowerNum:--FollowerNum
                                        }))
                                    }
                                    dispatch(FollowerActions.updateProps({
										flag:!flag	
									}))	
                                   
                                  
                                    
								}						
							}}
							type="button" className={item.hasFollowed?'btn btn-secondary btn-sm float-right mr-5 follow-btn':'btn btn-info btn-sm float-right mr-5 follow-btn'}>
								{item.hasFollowed?'已关注':'关注他'}</button>
                    </div>
                </div>
            </li>		


                )
            })}
            												
        </ul>
        {/* <!-- 分页 --> */}
        <nav className="mt-5">
        <Pagination showQuickJumper total={FollowerNum}
                            current={page}
                            defaultPageSize={5}
                            showTotal={FollowerNum => `Total ${FollowerNum} items`}
                            onChange={(page, pageSize) => {
                               dispatch( FollowerActions.updateProps({ page: page, size: pageSize }))
							   let params={
								page,
								size,
								targetId,
			                    userId,
							   }
                               dispatch(FollowerActions.getFollower(params)) 
                            }
                            } />
        </nav>
    </div>

      )
    }