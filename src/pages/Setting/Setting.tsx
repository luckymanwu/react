import * as React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { useDispatch, useSelector } from "react-redux";
import { StoreState, SettingState,appState } from "../../redux/reducers"; 
import{appActions} from '../../redux/actions/app'
import{SettingActions} from '../../redux/actions/Setting'
import{getCookieItem} from '../../utils'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';



export interface SettingPageProps extends RouteConfigComponentProps { }
export const SettingPage: React.SFC<SettingPageProps> = (props) => {
    const dispatch = useDispatch();
    const { SettingProps } = useSelector<StoreState, SettingState>(
      (state) => state.Setting
    );
    const { appProps } = useSelector<StoreState, appState>(
      (state) => state.app
    );
    const{password,newPassword,prompt,loading,imageUrl}=SettingProps
    const{user}=appProps
    console.log(user)
    const newpwd = React.useRef<any>();
    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
      
    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      }

    function handleChange(info){
        if (info.file.status === 'uploading') {
            dispatch(SettingActions.updateProps({
                loading: true
            }))
          return;
        }
        if (info.file.status === 'done') {
          getBase64(info.file.originFileObj, imageUrl =>{
            dispatch(appActions.updateProps(
              {user:imageUrl}
            ))
            dispatch(SettingActions.updateProps({
              loading: false,
          }))
          }       
          );
        }
      };
return(
<div className="container p-5 mt-3 mb-3">
    <h6 className="text-left text-info border-bottom pb-2">上传头像</h6>
    <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="http://localhost:8030/community/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {user.header_url ? <img src={user.header_url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      
    {/* <!-- 修改密码 --> */}
    <h6 className="text-left text-info border-bottom pb-2 mt-5">修改密码</h6>
    <form className="mt-5" onSubmit={()=>{
          let params={
            password,
            newPassword,
            user:getCookieItem('userId')
        }
        dispatch(SettingActions.changePassword(params))
    }}>				
        <div className="form-group row mt-4">
            <label htmlFor="old-password" className="col-sm-2 col-form-label text-right">原密码:</label>
            <div className="col-sm-10">
                <input  onBlur={(e)=>{ dispatch(SettingActions.updateProps({password:e.target.value})) }}           
                type="password" className="form-control" id="old-password" placeholder="请输入原始密码!" required/>
                <div className="invalid-feedback">
                   {prompt}
                </div>							
            </div>
        </div>
        <div className="form-group row mt-4">
            <label htmlFor="new-password" className="col-sm-2 col-form-label text-right">新密码:</label>
            <div className="col-sm-10">
                <input ref={newpwd}  type="password" className="form-control" id="new-password" placeholder="请输入新的密码!" required/>
                <div className="invalid-feedback">

                </div>							
            </div>
        </div>
        <div className="form-group row mt-4">
            <label htmlFor="confirm-password" className="col-sm-2 col-form-label text-right">确认密码:</label>
            <div className="col-sm-10">
                <input onBlur={(e)=>{
                    if(e.target.value!=newpwd.current.value){
                        e.target.className="form-control is-invalid"
                    }else{
                        e.target.className="form-control"
                        dispatch(SettingActions.updateProps({newPassword:e.target.value})) 
                    }
                } }
                type="password" className="form-control" id="confirm-password" placeholder="再次输入新密码!" required/>
                <div className="invalid-feedback">
                    两次输入的密码不一致!
                </div>								
            </div>
        </div>				
        <div className="form-group row mt-4">
            <div className="col-sm-2"></div>
            <div className="col-sm-10 text-center">
                <button type="submit" className="btn btn-info text-white form-control">立即保存</button>
            </div>
        </div>
    </form>				
</div>
)
}