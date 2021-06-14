
import * as React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { StoreState,MyReplyState} from "../../redux/reducers";
import {getCookieItem} from '../../utils'
import { useDispatch, useSelector } from "react-redux";
export interface  MyReplyPageProps extends RouteConfigComponentProps {}
export const MyReplyPage: React.SFC<MyReplyPageProps> = (props) => {
	const userId = getCookieItem('userId');
    const dispatch = useDispatch();
    const { MyReplyProps } = useSelector<StoreState, MyReplyState>(
        (state) => state.MyReply
      );
return(
    <div className="container">
    {/* <!-- 选项 --> */}
    <div className="position-relative">
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className="nav-link" href="profile.html">个人信息</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="my-post.html">我的帖子</a>
            </li>
            <li className="nav-item">
                <a className="nav-link active" href="my-reply.html">我的回复</a>
            </li>
        </ul>
        <a href="profile.html" className="text-muted position-absolute rt-0">返回个人主页&gt;</a>
    </div>
    {/* <!-- 我的回复 --> */}
    <div className="mt-4">
        <h6><b className="square"></b> 回复的帖子(379)</h6>
        <ul className="list-unstyled mt-4 pl-3 pr-3">
            <li className="border-bottom pb-3 mt-4">
                <div className="font-size-16 text-info">
                    <a href="#" className="text-info">备战春招，面试刷题跟他复习，一个月全搞定！</a>
                </div>
                <div className="mt-1 font-size-14">
                    顶顶顶!								
                </div>
                <div className="text-right font-size-12 text-muted">
                    回复于 <b>2019-04-15 10:10:10</b>
                </div>
            </li>																																																
        </ul>
        {/* <!-- 分页 --> */}
        <nav className="mt-5">
            
        </nav>					
    </div>				
</div>
)
}