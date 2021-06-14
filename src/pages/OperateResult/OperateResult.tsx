import * as React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { useDispatch, useSelector } from "react-redux";
import { OperateResultActions } from '../../redux/actions/OperateResult'
import { StoreState, RegisterState,OperateResultState } from "../../redux/reducers";
import { Input,Button,Space } from 'antd';
export interface OperateResultPageProps extends RouteConfigComponentProps { }

export const OperateResultPage: React.SFC<OperateResultPageProps> = (props) => {
    const dispatch = useDispatch();
    const { RegisterProps } = useSelector<StoreState, RegisterState>(
      (state) => state.Register
    );
    const { OperateResultProps } = useSelector<StoreState, OperateResultState>(
        (state) => state.OperateResult
      );
    const{prompt} =OperateResultProps;
    const{username} = RegisterProps;
    const code = React.useRef<any>();
    const { location } = props;
	const { pathname } = location || {};
    let splitPathname = pathname.split('/');
    let urlUsername = splitPathname[splitPathname.length-1]
        return (
             <div className="main">
                <div className="container mt-5">
                    <div className="jumbotron">
                        <p className="lead" >{prompt}</p>
                        <hr className="my-4"/>
                       
                           <Input ref={code} placeholder="请输入激活码"/><br/><br/>             
                            <Button onClick={()=>{
                                const param={
                                    code:code.current.state.value,
                                    username:username==''?urlUsername:username
                                }
                              
                                dispatch(OperateResultActions.activate(param))
                            }}>激活</Button>
                       
                    </div>
                </div>
            </div>
        )
    }

