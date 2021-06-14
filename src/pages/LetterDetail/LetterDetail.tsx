import * as React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import{LetterDetailActions} from '../../redux/actions/LetterDetail'
import { useDispatch, useSelector } from "react-redux";
import { StoreState, LetterDetailState } from "../../redux/reducers"; 
import { Pagination } from 'antd';
import './LetterDetail.css'
export interface LetterDetailPageProps extends RouteConfigComponentProps { }
export const LetterDetailPage: React.SFC<LetterDetailPageProps> = (props) => {
    const dispatch = useDispatch();
    const {LetterDetailProps } = useSelector<StoreState, LetterDetailState>(
      (state) => state.LetterDetail
    );
    const conversatioId = props.location.search.split('=')[1]
    const{letters,page,size,letterNum,fromUsername,headUrl} = LetterDetailProps
    React.useEffect(() => {
        dispatch(LetterDetailActions.getLetterDetails(conversatioId,page,size));
      }, []);
    return(
        <div className="container">
        <div className="row">
            <div className="col-8">
                <h6><b className="square"></b> 来自 <i className="text-success" >{fromUsername}</i> 的私信</h6>
            </div>
            <div className="col-4 text-right">
                <button type="button" className="btn btn-secondary btn-sm" >返回</button>
                <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#sendModal">给TA私信</button>
            </div>
        </div>
        {/* <!-- 弹出框 --> */}
        <div className="modal fade" id="sendModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">发私信</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="recipient-name" className="col-form-label">发给：</label>
                                <input type="text" className="form-control" id="recipient-name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message-text" className="col-form-label">内容：</label>
                                <textarea className="form-control" id="message-text" rows={10}></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
                        <button type="button" className="btn btn-primary" id="sendBtn">发送</button>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- 提示框 --> */}
        <div className="modal fade" id="hintModal" tabIndex={-1} role="dialog" aria-labelledby="hintModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="hintModalLabel">提示</h5>
                    </div>
                    <div className="modal-body" id="hintBody">
                        发送完毕!
                    </div>
                </div>
            </div>
        </div>						
        
        {/* <!-- 私信列表 --> */}
        <ul className="list-unstyled mt-4">
         {letters.map((item)=>{
             return(
            <li key={item.id}className="media pb-3 pt-3 mb-2 " >
            <a href="#Profile">
                <img src={headUrl} className="mr-4 rounded-circle user-header" alt="用户头像" />
            </a>
            <div className="toast show d-lg-block" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <strong className="mr-auto">{fromUsername}</strong>
                    <small ></small>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body" >
                   {item.content}
                </div>
            </div>
        </li>
             )

       })}
           
        </ul>
        {/* <!-- 分页 --> */}
        <nav className="mt-5">
    <Pagination showQuickJumper total={letterNum}
                            current={page}
                            defaultPageSize={5}
                            showTotal={letterNum => `Total ${letterNum} items`}
                            onChange={(page, pageSize) => {
                               dispatch( LetterDetailActions.updateProps({ page: page, size: pageSize }))
                               dispatch(LetterDetailActions.getLetterDetails(conversatioId,page,pageSize)) 
                            }
                            } />
    
    </nav>
    </div>
    )
}