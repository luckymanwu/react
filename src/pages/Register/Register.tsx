import * as React from "react";
import { RegisterActions } from '../../redux/actions/Register'
import { RouteConfigComponentProps } from "react-router-config";
import { useDispatch, useSelector } from "react-redux";
import { StoreState, RegisterState } from "../../redux/reducers";

export interface RegisterPageProps extends RouteConfigComponentProps { }
export const RegisterPage: React.SFC<RegisterPageProps> = (props) => {
    const dispatch = useDispatch();
    const { RegisterProps } = useSelector<StoreState, RegisterState>(
      (state) => state.Register
    );
    const{userNamePrompt,passwordPrompt,confirmPasswordPrompt,emailPrompt,username,email,password} =RegisterProps
	const pwd = React.useRef<any>();
	const registerinfo =  React.useRef<any>();;
	const { location } = props;
	const { pathname } = location || {};
    return (
        <div className="main">
			<div className="container pl-5 pr-5 pt-3 pb-3 mt-3 mb-3">
				<h3 className="text-center text-info border-bottom pb-3">注&nbsp;&nbsp;册</h3>
				<form className="mt-5" onSubmit={()=>{
					let param = {
						username,
						password,
						email,
					}
					dispatch(RegisterActions.register(param))

				}}>
					<div className="form-group row">
						<label htmlFor="username" className="col-sm-2 col-form-label text-right">账号:</label>
						<div className="col-sm-10">
							<input onBlur={(e)=>{
                                dispatch(RegisterActions.checkUsername({username:e.target.value}))
                            }} 
                            type="text" className={userNamePrompt==''?"form-control":"form-control is-invalid"} id="username" placeholder="请输入您的账号!" required/>
							<div className="invalid-feedback">
								{userNamePrompt}
							</div>
						</div>
					</div>
					<div className="form-group row mt-4">
						<label htmlFor="password" className="col-sm-2 col-form-label text-right">密码:</label>
						<div className="col-sm-10">
							<input ref={pwd}  onBlur={(e)=>{
								 let patrn=/^(\w){6,20}$/;
								 if(!patrn.exec(e.target.value)){
									dispatch(RegisterActions.updateProps({passwordPrompt:'密码必须大于六位，且只能包含数字字母下划线'}))
								 }else{
									dispatch(RegisterActions.updateProps({passwordPrompt:''}))
								 }
							}}
							type="password" className={passwordPrompt==''?"form-control":"form-control is-invalid"} id="password" placeholder="请输入您的密码!" required/>
							<div className="invalid-feedback">
                            {passwordPrompt}
							</div>							
						</div>
					</div>
					<div className="form-group row mt-4">
						<label htmlFor="confirm-password" className="col-sm-2 col-form-label text-right">确认密码:</label>
						<div className="col-sm-10">
							<input onBlur={(e)=>{
								if(e.target.value!==(pwd.current.value)){
									dispatch(RegisterActions.updateProps({confirmPasswordPrompt:'密码不一致'}))
								}else{
									dispatch(RegisterActions.updateProps({confirmPasswordPrompt:'',password:e.target.value}))
								}

							}}
							type="password" className={confirmPasswordPrompt==''?"form-control":"form-control is-invalid"} id="confirm-password" placeholder="请再次输入密码!" required/>
							<div className="invalid-feedback">
                            {confirmPasswordPrompt}
							</div>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="email" className="col-sm-2 col-form-label text-right">邮箱:</label>
						<div className="col-sm-10">
							<input  onBlur={(e)=>{
								let patrn=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
								if(!(patrn.exec(e.target.value))){
									dispatch(RegisterActions.updateProps({emailPrompt:'非法邮箱'}))
								}else{
									dispatch(RegisterActions.checkUserEmail({email:e.target.value}))
								}      
                            }}  
                            type="email" className={emailPrompt==''?"form-control":"form-control is-invalid"} id="email" placeholder="请输入您的邮箱!" required/>
							<div className="invalid-feedback">
                              {emailPrompt}
							</div>
						</div>
					</div>
					<div className="form-group row mt-4">
						<div className="col-sm-2"></div>
						<div className="col-sm-10 text-center">
							<button type="submit" className="btn btn-info text-white form-control">立即注册</button>
						</div>
					</div>
				</form>				
			</div>
		</div>

    )

}


