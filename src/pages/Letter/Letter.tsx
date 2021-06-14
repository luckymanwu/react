import { RouteConfigComponentProps } from "react-router-config";
import { LetterActions } from '../../redux/actions/Letter';
import * as React from "react";
import { Pagination,Modal, Button } from 'antd';
import {ChatWidgetActions} from '../../redux/actions/ChatWidget'
import moment from "moment";
import { StoreState, LetterState } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
export interface LetterPageProps extends RouteConfigComponentProps { }
export const LetterPage: React.SFC<LetterPageProps> = (props) => {
    const dispatch = useDispatch();
    const { LetterProps } = useSelector<StoreState, LetterState>(
        (state) => state.Letter
      );
      const [isModalVisible, setIsModalVisible] = React.useState(false);
      const {conversations,page,size,conversationCount,unreadTotal,resModalVisible,toUserName,content} = LetterProps
      React.useEffect(() => {
        dispatch(LetterActions.getConversations(page,size));
      }, []);
      const resultModal =(
        <Modal visible={resModalVisible} title="提示框" onOk={()=>{
           setIsModalVisible(false)
           dispatch(LetterActions.updateProps({resModalVisible:false}))
           window.location.reload()
        }}  onCancel={()=>{  setIsModalVisible(false)
           window.location.reload()
        }} >
           发送成功
        </Modal>
       
    )
   

return(
    <div className="container">
    <div className="position-relative">
        {/* <!-- 选项 --> */}
        <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
                <a className="nav-link position-relative active" href="#Letter">朋友私信<span className="badge badge-danger">{unreadTotal}</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link position-relative" href="#Notice">系统通知<span className="badge badge-danger">{}</span></a>
            </li>
        </ul>
        <button onClick={()=>{
              setIsModalVisible(true);
        }}type="button" className="btn btn-primary btn-sm position-absolute rt-0" >发私信</button>
    </div>
    {/* <!-- 弹出框 --> */}
    <Modal title="发私信" visible={isModalVisible} onOk={()=>{
                    let params = {
                              toUserName,
                              content }
                          dispatch(LetterActions.sendMessage(params))
                          setIsModalVisible(false); 
                          }} 
                          onCancel={()=>{  setIsModalVisible(false); }}>
                                  <form>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name" className="col-form-label">发给：</label>
                                            <input onChange={(e)=>{
                                                 dispatch(LetterActions.updateProps({
                                                    toUserName:e.target.value
                                                    }))     
                                            }}
                                            type="text" className="form-control" id="recipient-name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message-text" className="col-form-label">内容：</label>
                                            <textarea onChange={(e)=>{
                                                dispatch(LetterActions.updateProps({
                                                    content:e.target.value,
                                                    }))

                                            }}
                                            className="form-control" id="message-text" rows={15}></textarea>
                                        </div>
                                    </form>
          </Modal>
    {/* <!-- 提示框 --> */}
      {resultModal}
    
    {/* <!-- 私信列表 --> */}
    <ul className="list-unstyled">
    {
        conversations.map((item,idx)=>{
            return(
                <li key={item.id} className="media pb-3 pt-3 mb-3 border-bottom position-relative">
                <span className="badge badge-danger">{item.unreadNum}</span>
                <a href="#Profile">
                    <img src={item.headUrl} className="mr-4 rounded-circle user-header" alt="用户头像" />
                </a>
                <div className="media-body">
                    <h6 className="mt-0 mb-3">
                        <span className="text-success">{item.fromUsername}</span>
                        <span className="float-right text-muted font-size-12">{moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </h6>
                    <div>
                        <a href="letter-detail.html">{item.content}</a>
                        <ul className="d-inline font-size-12 float-right">
                            <li className="d-inline ml-2"><a onClick={()=>{
                                dispatch(ChatWidgetActions.updateProps({headUrl:item.headUrl,fromUsername:item.fromUsername}))
                            }}
                            
                            href={'#ChatWidget?conversatioId='+item.conversation_id+'&targetId='+item.targetId} className="text-primary">共{item.count}条会话</a></li>
                        </ul>
                    </div>
                </div>
            </li>			
            )
        })
    }
       																													
    </ul>
    {/* <!-- 分页 --> */}
    <nav className="mt-5">
    <Pagination showQuickJumper total={conversationCount}
                            current={page}
                            defaultPageSize={5}
                            showTotal={conversationCount => `Total ${conversationCount} items`}
                            onChange={(page, pageSize) => {
                               dispatch( LetterActions.updateProps({ page: page, size: pageSize }))
                               dispatch(LetterActions.getConversations(page,pageSize)) 
                            }
                            } />
    
    </nav>
</div>

    )
    }