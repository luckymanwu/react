import * as React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { DiscussDetailActions } from '../../redux/actions/DiscussPostDetail'
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from 'antd';
import { message, Button } from 'antd';
import { StoreState, DiscussPostDetailState } from "../../redux/reducers";
import './DiscussPostDetail.css'
import moment from "moment";
import {getCookieItem} from '../../utils'
export interface DiscussPostDetailPageProps extends RouteConfigComponentProps { }
export const DiscussPostDetailPage: React.SFC<DiscussPostDetailPageProps> = (props) => {
    const dispatch = useDispatch();
    const { DiscussPostDetailProps } = useSelector<StoreState, DiscussPostDetailState>(
      (state) => state.DiscussPostDetail
    );
    const {discussPostDetail,page,size,postId,ctc,ctd,like,total,comment}=DiscussPostDetailProps
    const PostId = props.location.search.split('=')[1]
    React.useEffect(() => {
        const params={
            postId:PostId,page:page,size:size
        }
        dispatch(DiscussDetailActions.updateProps({postId:PostId}))
        dispatch(DiscussDetailActions.getDiscussDetail(PostId));
        dispatch(DiscussDetailActions.getComments(params));
      }, []);

return(
<div>
  <div className="container">
    <h6 className="mb-4">
        <img src="http://static.nowcoder.com/images/img/icons/ico-discuss.png"/>
        <span>{discussPostDetail.title}</span>
        <div className="float-right">
            <Button 
            onClick={()=>{
                let params={
                    postId:PostId,
                    userId:getCookieItem('userId'),
                    type:Math.abs(discussPostDetail.type-1)
                }
                dispatch(DiscussDetailActions.top(params))
                dispatch(DiscussDetailActions.updateProps({
                    discussPostDetail:{...discussPostDetail,type:Math.abs(discussPostDetail.type-1)}
                }))
                
            }}  className="btn btn-danger btn-sm">{discussPostDetail.type==1?'已置顶':'置顶'}</Button>
            <Button  onClick={()=>{
                let params={
                    postId:PostId,
                    userId:getCookieItem('userId'),
                    status:Math.abs(discussPostDetail.status-1)
                }
                dispatch(DiscussDetailActions.updateProps({
                    discussPostDetail:{...discussPostDetail,status:Math.abs(discussPostDetail.status-1)}
                }))
                dispatch(DiscussDetailActions.wonderful(params))
            }}
             className="btn btn-danger btn-sm">{discussPostDetail.status==1?'已加精':'加精'}</Button>
            <Button  onClick={()=>{
                let params={
                    postId:PostId,
                    userId:getCookieItem('userId'),
                    status:2
                }
                dispatch(DiscussDetailActions.delete(params))
                
            }}
              className="btn btn-danger btn-sm">删除</Button>
        </div>
    </h6>
    {/* <!-- 作者 --> */}
    <div className="media pb-3 border-bottom">
        <a href="#/Profile">
            <img src={discussPostDetail.headerUrl} className="align-self-start mr-4 rounded-circle user-header" alt="用户头像" />
        </a>
        <div className="media-body">
            <div className="mt-0 text-warning">{discussPostDetail.username}</div>
            <div className="text-muted mt-3">
                发布于 <b>{moment(discussPostDetail.createTime).format('YYYY-MM-DD HH:mm:ss')}</b>
                <ul className="d-inline float-right">
                    <li className="d-inline ml-2"><a 
                    onClick={()=>{
                        let params={
                            entityType:1,
                            entityId:postId,
                            entityUserId:discussPostDetail.userId,
                        }
                        dispatch(DiscussDetailActions.like(params))
                    }} 
                     className="text-primary"> 赞{like}</a></li>
                    <li className="d-inline ml-2">|</li>
                    <li className="d-inline ml-2"><a href="#replyform" className="text-primary">回帖 {total}</a></li>
                </ul>
            </div>
        </div>
    </div>	
    {/* <!-- 正文 --> */}
    <div className="mt-4 mb-3 content">
        {discussPostDetail.content}
    </div>
</div>
  <div className="container mt-3">
    {/* <!-- 回帖数量 --> */}
    <div className="row">
        <div className="col-8">
            <h6><b className="square"></b> <i>{total}</i>条回帖</h6>
        </div>
        <div className="col-4 text-right">
            <a href="#replyform" className="btn btn-primary btn-sm">&nbsp;&nbsp;回&nbsp;&nbsp;帖&nbsp;&nbsp;</a>
        </div>
    </div>
   <ul className="list-unstyled mt-4">
       { 
        ctd.map((item,idx) =>{   
           return(
            <li key={item.id} className="media pb-3 pt-3 mb-3 border-bottom">
            <a href="profile.html">
                <img src="http://images.nowcoder.com/head/2t.png" className="align-self-start mr-4 rounded-circle user-header" alt="用户头像" />
            </a>
            <div className="media-body">
                <div className="mt-0">
                    <span className="font-size-12 text-success">{item.username}</span>
                    <span className="badge badge-secondary float-right floor">{(page-1)*size+idx+1}#</span>
                </div>
                <div className="mt-2">
                  {item.content}
                </div>
                <div className="mt-4 text-muted font-size-12">
                    <span>发布于 <b>{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</b></span>
                    <ul className="d-inline float-right">
                        <li className="d-inline ml-2"><a  
                        onClick={()=>{
                        let params={
                            entityType:1,
                            entityId:item.id,
                            entityUserId:item.userId,
                        }
                        dispatch(DiscussDetailActions.like(params))
                        item.likes++;
                        
                    }} 
                        className="text-primary">赞({item.likes})</a></li>
                        <li className="d-inline ml-2">|</li>
                        <li className="d-inline ml-2"><a href="#" className="text-primary">回复(2)</a></li>
                        
                    </ul>
                </div>

                <ul  className="list-unstyled mt-4 bg-gray p-3 font-size-12 text-muted">
               { ctc.map((ctc) =>{
                   if(ctc.entityId!=null&& ctc.entityId==item.id){    
                   return(    
                    <li  key={ctc.id} className="pb-3 pt-3 mb-3 border-bottom">
                        <div>
                             {ctc.target_id!=0?<span><i className="text-info">{ctc.username}</i> 回复 <b className="text-info">{ctc.targetName}</b>:&nbsp;&nbsp;</span>
                             :<span><b className="text-info">{ctc.username}</b>:&nbsp;&nbsp;</span>}
                            <span>{ctc.content}</span>
                        </div>
                        <div className="mt-3">
                            <span>{moment(ctc.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                            <ul className="d-inline float-right">
                                <li className="d-inline ml-2"><a 
                                  onClick={()=>{
                                    let params={
                                        entityType:2,
                                        entityId:ctc.id,
                                        entityUserId:ctc.userId,
                                    }
                                    dispatch(DiscussDetailActions.like(params))
                                    ctc.likes++;
                                }} className="text-primary">赞({ctc.likes})</a></li>
                                <li className="d-inline ml-2">|</li>
                                <li className="d-inline ml-2"><a href="#huifu01" data-toggle="collapse" className="text-primary">回复</a></li>
                            </ul>
                            <div id="huifu01" className="mt-4 collapse">
                                <div>
                                    <input onChange={(e)=>{
                                 dispatch(DiscussDetailActions.updateProps({comment:e.target.value}))}}
                                    type="text" className="input-size" placeholder={"回复"+ctc.username}/>
                                </div>
                                <div className="text-right mt-2">
                                    <button onClick={()=>{
                                         let params={
                                            entityType:2,
                                            content:comment,
                                            entityId:item.id,
                                            targetId:ctc.userId
                                        }
                                        dispatch(DiscussDetailActions.addComment(params))
                                    }}
                                     type="button" className="btn btn-primary btn-sm" >&nbsp;&nbsp;回&nbsp;&nbsp;复&nbsp;&nbsp;</button>
                                </div>										
                            </div>
                        </div>								
                    </li>             
                   )}
                   })}
                     <li className="pb-3 pt-3">
                         <div>
                             <input onChange={(e)=>{
                                 dispatch(DiscussDetailActions.updateProps({comment:e.target.value}))
                             }} type="text" className="input-size" placeholder="请输入你的观点"/>
                         </div>
                         <div className="text-right mt-2">
                            <button onClick={()=>{
                                let params={
                                    entityType:2,
                                    content:comment,
                                    entityId:item.id,
                                    targetId:ctc.userId
                                }
                                dispatch(DiscussDetailActions.addComment(params))
                            }}
                            type="button" className="btn btn-primary btn-sm">&nbsp;&nbsp;回&nbsp;&nbsp;复&nbsp;&nbsp;</button>
                         </div>
                     </li>
                </ul>
            </div>
        </li>

    
           )
        })  
      }								
    </ul>
   
    <nav className="mt-5" >
       <Pagination showQuickJumper  total={total}
        current={page} 
        defaultPageSize={2}
        showTotal={discussPostCount => `Total ${discussPostCount} items`}
        onChange={(page, pageSize) => {
            // 页面变化时需要进行传参，保证用户是想继续查看当前查询信息下的数据
            const params = {
                page: page,
                size: pageSize,
                postId,
            }  
            dispatch(DiscussDetailActions.updateProps(params))
            dispatch(DiscussDetailActions.getComments(params))
        }
    }/>
             </nav>
</div>
<div className="container mt-3">
    <form onSubmit={()=>{
        let params={
            entityType:1,
            content:comment,
            entityId:postId,
            targetId:discussPostDetail.userId
        }
        dispatch(DiscussDetailActions.addComment(params))
    
    }}className="replyform">
        <p className="mt-3">
            <a ></a>
            <textarea onChange={(e)=>{
                dispatch(DiscussDetailActions.updateProps({comment:e.target.value}))
            }} placeholder="在这里畅所欲言你的看法吧!"></textarea>
        </p>
        <p className="text-right">
            <button type="submit" className="btn btn-primary btn-sm">&nbsp;&nbsp;回&nbsp;&nbsp;帖&nbsp;&nbsp;</button>
        </p>
    </form>
  </div>
</div>
)
}
