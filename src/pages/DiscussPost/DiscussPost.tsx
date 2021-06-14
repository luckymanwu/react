import * as React from "react";
import { DiscussActions } from '../../redux/actions/DiscussPost'
import { Pagination } from 'antd';
import { RouteConfigComponentProps } from "react-router-config";
import { useDispatch, useSelector } from "react-redux";
import { StoreState, DiscussPostState } from "../../redux/reducers";
import { Modal, Button } from 'antd';
import moment from "moment";
import {getCookieItem} from '../../utils'

export interface DiscussPostPageProps extends RouteConfigComponentProps { }

export const DiscussPostPage: React.SFC<DiscussPostPageProps> = (props) => {
    const dispatch = useDispatch();
    const { DiscussPostProps } = useSelector<StoreState, DiscussPostState>(
      (state) => state.DiscussPost
    );
    const mode = props.location.search.split('=')[1]
    const{ userId,page,size,alldiscussPost,discussPostCount,title,content,ispublish} = DiscussPostProps;
    const params = {
        userId: userId, 
        page: page, 
        size: size,
        mode:mode
      }
      const publishModal =React.useRef<any>()
      React.useEffect(() => {
        dispatch(DiscussActions.getAllDiscuss(params));
      }, []);
      const [isModalVisible, setIsModalVisible] = React.useState(false);
     const resultModal =(
         <Modal visible={ispublish} title="提示框" onOk={()=>{
            setIsModalVisible(false)
            dispatch(DiscussActions.updateProps({ispublish:false}))
            window.location.reload()
         }}  onCancel={()=>{  setIsModalVisible(false)
         }} >
            发布成功
         </Modal>
        
     )

 return (
             <div className="container">
                    <div className="position-relative">
                        {/* <!-- 筛选条件 --> */}
                        <ul className="nav nav-tabs mb-3">
                            <li className="nav-item">
                                <a onClick={()=>{
                                    window.location.href="#DiscussPost?mode=0"
                                    window.location.reload()
                                }} className={mode=='1'?"nav-link ":" nav-link active"} >最新</a>
                            </li>
                            <li className="nav-item">
                                <a onClick={()=>{
                                    window.location.href="#DiscussPost?mode=1"
                                    window.location.reload()
                                }}
                                className={mode=='1'?"nav-link active":"nav-link "}>最热</a>
                            </li>
                        </ul>
                        <Button className="btn btn-primary btn-sm position-absolute rt-0" type="primary" onClick={()=>{
                        setIsModalVisible(true);
                    }}> 我要发布</Button>
                    </div>
                    
                <Modal title="新帖发布" visible={isModalVisible} onOk={()=>{
                    let params = {
                              title,
                              content }
                          dispatch(DiscussActions.publishDiscussPost(params))
                          setIsModalVisible(false); 
                          }} 
                          onCancel={()=>{  setIsModalVisible(false); }}>
                                  <form>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name" className="col-form-label">标题：</label>
                                            <input onChange={(e)=>{
                                                 dispatch(DiscussActions.updateProps({
                                                    title:e.target.value,
                                                    }))     
                                            }}
                                            type="text" className="form-control" id="recipient-name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message-text" className="col-form-label">正文：</label>
                                            <textarea onChange={(e)=>{
                                                dispatch(DiscussActions.updateProps({
                                                    content:e.target.value,
                                                    }))

                                            }}
                                            className="form-control" id="message-text" rows={15}></textarea>
                                        </div>
                                    </form>
          </Modal>
                   {resultModal}                 
                   
                    <ul className="list-unstyled">
                        {
                            alldiscussPost.map((item) => {
                                return (                                
                                    <li  key={item.discussPostId} className="media pb-3 pt-3 mb-3 border-bottom" >
                                        <a href={"#/Profile?userId="+item.userId}>
                                            <img src={item.headerUrl} className="mr-4 rounded-circle" alt="用户头像" style={{ width: '50px', height: '50px' }} />
                                        </a>
                                        <div className="media-body">
                                            <h6 className="mt-0 mb-3">
                                                <a href={'#DiscussPostDetail?PostId='+item.id}>{item.title}</a>
                                                {item.type==1? <span className="badge badge-secondary bg-primary" >置顶</span>:''}
                                                {item.status==1?  <span className="badge badge-secondary bg-danger">精华</span>:''}
                                            </h6>
                                            <div className="text-muted font-size-12">
                                                <u className="mr-3" >{item.username}</u> 发布于 {moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
                                                <ul className="d-inline float-right">
                                                    <li className="d-inline ml-2">赞 {item.like}</li>
                                                    <li className="d-inline ml-2">|</li>
                                                    <li className="d-inline ml-2">回帖 {item.replyNum}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {/* 分页为服务端分页，前端需要传参当前页和数据展示量 */}
                    <nav className="mt-5" >
                        <Pagination showQuickJumper total={discussPostCount}
                            current={page}
                            showTotal={discussPostCount => `Total ${discussPostCount} items`}
                            onChange={(page, pageSize) => {
                                // 页面变化时需要进行传参，保证用户是想继续查看当前查询信息下的数据
                                const params = {
                                    page: page,
                                    size: pageSize,
                                    userId: 0
                                } 
                               dispatch( DiscussActions.updateProps({ page: page, size: pageSize }))
                               dispatch(DiscussActions.getAllDiscuss(params)) 
                            }
                            } />
                    </nav>
                </div>
            
        )
    }


