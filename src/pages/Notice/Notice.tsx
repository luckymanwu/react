import * as React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { useDispatch, useSelector } from "react-redux";
import { StoreState,NoticeState } from "../../redux/reducers";
import {NoticeActions} from "../../redux/actions/Notice"
import { getCookieItem } from "src/utils";
import moment from "moment"
export interface NoticePageProps extends RouteConfigComponentProps { }

export const NoticePage: React.SFC<NoticePageProps> = (props) => {
    const dispatch = useDispatch();
    const { NoticeProps } = useSelector<StoreState, NoticeState>(
      (state) => state.Notice
    );
	React.useEffect(()=>{
		dispatch(NoticeActions.getNotices(getCookieItem('userId')))
	},[])
	const{commentNotice,likeNotice,followNotice,unreadTotal} = NoticeProps
	const entityTypeMap={
		1:'帖子',
		2:'评论'
	}

return(
	<div className="container">
				<div className="position-relative">
					{/* <!-- 选项 --> */}
					<ul className="nav nav-tabs mb-3">
						<li className="nav-item">
							<a className="nav-link position-relative" href="#Letter">朋友私信<span className="badge badge-danger">{}</span></a>
						</li>
						<li className="nav-item">
							<a className="nav-link position-relative active" href="#Notice">系统通知<span className="badge badge-danger">{unreadTotal}</span></a>
						</li>
					</ul>
				</div>	
				
				{/* <!-- 通知列表 --> */}
				<ul className="list-unstyled">
					<li className="media pb-3 pt-3 mb-3 border-bottom position-relative">
						<span className="badge badge-danger">{commentNotice.unread||0}</span>
						<img src="http://static.nowcoder.com/images/head/reply.png" className="mr-4 user-header" alt="通知图标"/>
						<div className="media-body">
							<h6 className="mt-0 mb-3">
								<span>评论</span>
								<span className="float-right text-muted font-size-12">{moment(commentNotice.create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
							</h6>
							<div>
								<a href="notice-detail.html">用户 <i>{commentNotice.fromUsername}</i> 评论了你的<b>{entityTypeMap[commentNotice.entityType]}</b> ...</a>
								<ul className="d-inline font-size-12 float-right">
									<li className="d-inline ml-2"><span className="text-primary"><a href={'#NoticeDetail?conversationId='+commentNotice.conversation_id}>共 <i>{commentNotice.count}</i> 条会话</a></span></li>
								</ul>
							</div>
						</div>
					</li>
					<li className="media pb-3 pt-3 mb-3 border-bottom position-relative">
						<span className="badge badge-danger">{likeNotice.unread||0}</span>
						<img src="http://static.nowcoder.com/images/head/like.png" className="mr-4 user-header" alt="通知图标"/>
						<div className="media-body">
							<h6 className="mt-0 mb-3">
								<span>赞</span>
								<span className="float-right text-muted font-size-12">{moment(likeNotice.create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
							</h6>
							<div>
								<a href="notice-detail.html">用户 <i>{likeNotice.fromUsername}</i> 点赞了你的<b>{entityTypeMap[likeNotice.entityType]}</b> ...</a>
								<ul className="d-inline font-size-12 float-right">
									<li className="d-inline ml-2"><span className="text-primary"><a href={'#NoticeDetail?conversationId='+likeNotice.conversation_id}>共 <i>{likeNotice.count}</i> 条会话</a></span></li>
								</ul>
							</div>
						</div>
					</li>
					<li className="media pb-3 pt-3 mb-3 border-bottom position-relative">
						<span className="badge badge-danger">{followNotice.unread}</span>
						<img src="http://static.nowcoder.com/images/head/follow.png" className="mr-4 user-header" alt="通知图标"/>
						<div className="media-body">
							<h6 className="mt-0 mb-3">
								<span>关注</span>
								<span className="float-right text-muted font-size-12">{moment(followNotice.create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
							</h6>
							<div>
								<a href="notice-detail.html">用户 <i>{followNotice.fromUsername}</i> 关注了你 ...</a>
								<ul className="d-inline font-size-12 float-right">
									<li className="d-inline ml-2"><span className="text-primary"><a href={'#NoticeDetail?conversationId='+followNotice.conversation_id}>共 <i>{followNotice.count}</i> 条会话</a></span></li>
								</ul>
							</div>
						</div>
					</li>					
				</ul>
			</div>

)
}