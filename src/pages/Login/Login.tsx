import React, { Component } from 'react'
import { LoginActions } from '../../redux/actions/Login'
import { RouteConfigComponentProps } from "react-router-config";
import { useDispatch, useSelector } from "react-redux";
import { StoreState, LoginState } from "../../redux/reducers"; 
import './Login.css'
    export interface LoginPageProps extends RouteConfigComponentProps { }
    export const LoginPage: React.SFC<LoginPageProps> = (props) => {
        const dispatch = useDispatch();
        const { LoginProps } = useSelector<StoreState, LoginState>(
          (state) => state.Login
        );
        const{username,password,authCode,authImage, prompt,authcodePrompt} = LoginProps
        React.useEffect(() => {
            dispatch(LoginActions.getAuthCode());
          }, []);
          const authcode = React.useRef<any>();
        
     return(	
                <div className="container pl-5 pr-5 pt-3 pb-3 mt-3 mb-3">
                    <h3 className="text-center text-info border-bottom pb-3">登&nbsp;&nbsp;录</h3>
                    <form className="mt-5">				
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2 col-form-label text-right">账号:</label>
                            <div className="col-sm-10">
                                <input onChange={(e)=>{
                                dispatch(LoginActions.updateProps({username:e.target.value}))}}
                                type="text" className={prompt==''?"form-control":"form-control is-invalid"} id="username" placeholder="请输入您的账号!" required/>
                                <div className="invalid-feedback">
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mt-4">
                            <label htmlFor="password" className="col-sm-2 col-form-label text-right">密码:</label>
                            <div className="col-sm-10">
                                <input onChange={(e)=>{
                                dispatch(LoginActions.updateProps({password:e.target.value}))}}
                                 type="password" className={prompt==''?"form-control ":"form-control is-invalid"} id="password" placeholder="请输入您的密码!" required/>
                                <div className="invalid-feedback">
                                   {prompt}
                                </div>							
                            </div>
                        </div>
                        <div className="form-group row mt-4">
                            <label htmlFor="verifycode" className="col-sm-2 col-form-label text-right">验证码:</label>
                            <div className="col-sm-6">
                                <input ref={authcode}
                                type="text" className={authcodePrompt==''?"form-control":"form-control is-invalid"} id="verifycode" placeholder="请输入验证码!"/>
                                <div className="invalid-feedback">
                                   {authcodePrompt}
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <img src={authImage} style={{width:'100px' , height:'40px'}} className="mr-2"/>
                                <a onClick={()=>{
                                     dispatch(LoginActions.getAuthCode());
                                }} className="font-size-12 align-bottom">刷新验证码</a>
                            </div>
                        </div>				
                        <div className="form-group row mt-4">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-10">
                                <a href="forget.html" className="text-danger float-right">忘记密码?</a>
                            </div>
                        </div>				
                        <div className="form-group row mt-4">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-10 text-center">
                                <button onClick={()=>{
                                     let params={
                                        username,
                                        password,
                                        authCode,
                                    }
                                    if(authCode==authcode.current.value){
                                        dispatch(LoginActions.updateProps({authcodePrompt:''}))
                                        dispatch(LoginActions.login(params));
                                    }else{
                                        dispatch(LoginActions.updateProps({authcodePrompt:'验证码错误'}))
                                    }                    
                                }}
                                 type="submit" className="btn btn-info text-white form-control">立即登录</button>
                            </div>
                        </div>
                    </form>				
                </div>
         
        )
    }
