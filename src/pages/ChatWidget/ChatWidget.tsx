import * as React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { useDispatch, useSelector } from "react-redux";
import 'react-chat-elements/dist/main.css';
import {ChatWidgetActions} from '../../redux/actions/ChatWidget'
import { StoreState, ChatWidgetState } from "../../redux/reducers"; 
import { MessageList} from 'react-chat-elements'
import {getCookieItem} from '../../utils'
import {Button, Row, Col, Divider, Input} from "antd";
export interface ChatWidgetPageProps extends RouteConfigComponentProps { }
export const ChatWidgetPage: React.SFC<ChatWidgetPageProps> = (props) => {
    const {TextArea} = Input;
    const dispatch = useDispatch();
    const userId = getCookieItem('userId')
    const { ChatWidgetProps } = useSelector<StoreState, ChatWidgetState>(
      (state) => state.ChatWidget
    );
    const conversatioId = props.location.search.split('=')[1].split('&')[0]
    const targetId = props.location.search.split('=')[2]
    const{ fromUsername,headUrl,letters,sendMsg} = ChatWidgetProps

    React.useEffect(() => {
        dispatch(ChatWidgetActions.getLetterDetails(conversatioId));
        dispatch(ChatWidgetActions.readMsg(conversatioId,userId))
      }, []);
    return( 
        <div className="container">
        <Col style={{
            width: 1000,
            height: 610,
            display: 'inline-block',
            borderLeft: "3px solid",
            borderRight: "3px solid",
            borderTop: "3px solid",
            borderBottom: "3px solid",
        }}>
            <Row>
                <Col style={{
                    width: 1000,
                    height: 50,
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: 20
                }}>
                  <img src={headUrl} className="mr-4 rounded-circle user-header" alt="用户头像" />
                  {fromUsername}      
                </Col>
            </Row>
            <Row>
                <div style={{
                    width: 1000,
                    height: 420,
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: 20,
                    overflow: "auto",
                    backgroundColor: "\t#C0C0C0"
                }}       
                >
                    <MessageList
                        className='message-list'
                        dataSource={letters}
                    />
                </div>
            </Row>

            <Row>
                <Col style={{
                    width: 1000,
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: 20
                }}>

                    <TextArea value={sendMsg} rows={4} onChange={(e)=>{ 
                        dispatch(ChatWidgetActions.updateProps({
                            sendMsg:e.target.value
                        }))
                    }}/>
                    <Button type="primary" onClick={()=>{
                        let params={
                            content:sendMsg,
                            conversation_id:conversatioId,
                            from_id:getCookieItem("userId"),
                            to_id:targetId
                        }
                        letters.push({
                            position: 'right',
                            type: 'text',
                            text:sendMsg,
                            date:new Date()
                        })
                        dispatch(ChatWidgetActions.sendMsg(params))
                        dispatch(ChatWidgetActions.updateProps({
                            sendMsg:'',
                            letters,
                        }))

                    }} >发送</Button>
                </Col>
            </Row>
        </Col>
        </div>
    );
}
    