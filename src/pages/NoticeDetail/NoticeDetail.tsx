import * as React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from 'antd';
import { StoreState,NoticeDetailState } from "../../redux/reducers";
import {NoticeDetailActions} from "../../redux/actions/NoticeDetail"
import {getCookieItem} from '../../utils'
import moment from 'moment'
export interface NoticeDetailPageProps extends RouteConfigComponentProps { }

export const NoticeDetailPage: React.SFC<NoticeDetailPageProps> = (props) => {
    const dispatch = useDispatch();
    const { NoticeDetailProps } = useSelector<StoreState, NoticeDetailState>(
      (state) => state.NoticeDetail
    );
    const conversationId = props.location.search.split('=')[1]
    const{NoticeDetails,page,size,NoticeDetailNum} = NoticeDetailProps
    React.useEffect(()=>{
        const params = {
            conversationId,
            userId: getCookieItem('userId'), 
            page: page, 
            size: size,
          }
		dispatch(NoticeDetailActions.getNoticeDetails(params))
        dispatch(NoticeDetailActions.getNoticeDetailNums(getCookieItem('userId'),conversationId))
	},[])
    const entityTypeMap={
		1:'帖子',
		2:'评论'
        
	}

return(
<div className="container">
<div className="row">
    <div className="col-8">
        <h6><b className="square"></b> 系统通知</h6>
    </div>
    <div className="col-4 text-right">
        <button type="button" className="btn btn-secondary btn-sm" >返回</button>
    </div>
</div>

{/* <!-- 通知列表 --> */}
<ul className="list-unstyled mt-4">
    {
    NoticeDetails.map((item)=>{
        return(
            <li className="media pb-3 pt-3 mb-2">
            <img src="http://static.nowcoder.com/images/head/notify.png" className="mr-4 rounded-circle user-header" alt="系统图标"/>
            <div className="toast show d-lg-block" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <strong className="mr-auto">{item.username}</strong>
                    <small>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</small>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body">
                    <span>用户 <i>{item.fromUsername}</i> {conversationId=='comment'?'评论了你的':conversationId=='like'?'点赞了你的':'关注了你'}<b>{entityTypeMap[item.entityType]}</b>,
                     <a className="text-primary" href={conversationId=='follow'?"#Profile?userId="+item.fromUserId:"#DiscussPostDetail?postId="+item.entityId}>点击查看</a> !</span>
                </div>
            </div>
        </li>					

        )
        })
    }
    
   																																																				
</ul>

<nav className="mt-5">
<Pagination showQuickJumper total={NoticeDetailNum} current={page} 
defaultPageSize={5}
showTotal={NoticeDetailNum => `Total ${NoticeDetailNum} items`}

                            onChange={(page, pageSize) => {
                                // 页面变化时需要进行传参，保证用户是想继续查看当前查询信息下的数据
                                const params = {
                                    conversationId,
                                    userId: getCookieItem('userId'),
                                    page: page,
                                    size: pageSize,
                                   
                                } 
                               dispatch( NoticeDetailActions.updateProps({ page: page, size: pageSize }))
                               dispatch(NoticeDetailActions.getNoticeDetails(params)) 
                            }
                            } />
                    </nav>
  
</div>
)
}

