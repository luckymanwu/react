import React, { Component } from 'react'
import { RouteConfigComponentProps } from "react-router-config";
import { StoreState, appState ,SearchState} from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from '../../redux/actions/app'
import cookie from 'react-cookies'
import { getCookieItem } from 'src/utils';
import { SearchActions } from 'src/redux/actions/Search';

export interface TopbarProps extends RouteConfigComponentProps {}
export const Header: React.SFC<TopbarProps> = (props: any) => {

	const dispatch = useDispatch();

	const { appProps } = useSelector<StoreState, appState>(
		(state) => state.app
	  );
	  
	const { SearchProps } = useSelector<StoreState, SearchState>(
		(state) => state.Search
	  );
	  const{user,isLogin,key}= appProps
	const{page,size} =SearchProps

        return (
            <header className="bg-dark sticky-top">
			<div className="container">
				{/* <!-- 导航 --> */}
				<nav className="navbar navbar-expand-lg navbar-dark">
					{/* <!-- logo --> */}
					<a className="navbar-brand" href="#"/>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					{/* <!-- 功能 --> */}
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item ml-3 btn-group-vertical">
								<a className="nav-link" href="#/DiscussPost">首页</a>
							</li>
							<li className="nav-item ml-3 btn-group-vertical" >
								<a className="nav-link position-relative" href="#/Letter">消息<span className="badge badge-danger">12</span></a>
							</li>
							<li className="nav-item ml-3 btn-group-vertical" style={{display:isLogin?'none':''}}>
								<a className="nav-link" href="#/Register">注册</a>
							</li>
							<li className="nav-item ml-3 btn-group-vertical" style={{display:isLogin?'none':''}}>
								<a className="nav-link" href="#/Login">登录</a>
							</li>
							<li className="nav-item ml-3 btn-group-vertical dropdown" style={{display:isLogin?'':'none'}}>
								<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<img src={user.headerUrl} className="rounded-circle" style={{width:'30px'}}/>
								</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdown" >
									<a className="dropdown-item text-center" href={'#Profile?userId='+getCookieItem('userId')}>个人主页</a>
									<a className="dropdown-item text-center" href="#Setting">账号设置</a>
									<a className="dropdown-item text-center" href="#/Login"
									onClick={()=>{
										cookie.remove('token',{ path: '/' })
										cookie.remove('userId',{ path: '/' })
										localStorage.removeItem('userId')
										dispatch(appActions.updateProps({
											isLogin:false,
											username:''
										}))			
									}}>退出登录</a>
									<div className="dropdown-divider"></div>
									<span className="dropdown-item text-center text-secondary">{user.username}</span>
								</div>
							</li>
						</ul>
						{/* <!-- 搜索 --> */}
						<form className="form-inline my-2 my-lg-0" action={"#Search?key="+key}>
							<input onChange={(e)=>{
									dispatch(appActions.updateProps({
										key:e.target.value
									}))
								
							}}
							 className="form-control mr-sm-2" type="search" aria-label="Search" />
							<button onClick={()=>{
								dispatch(SearchActions.search(key,page,size))
							}} className="btn btn-outline-light my-2 my-sm-0" type="submit">搜索</button>
						</form>
					</div>
				</nav>
			</div>
		</header>

        )
    }

