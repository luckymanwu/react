import * as React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { StoreState,MyPostState} from "../../redux/reducers";
import {getCookieItem} from '../../utils'
import { useDispatch, useSelector } from "react-redux";
export interface MyPostPageProps extends RouteConfigComponentProps {}
export const MyPostPage: React.SFC<MyPostPageProps> = (props) => {
	const userId = getCookieItem('userId');
    const dispatch = useDispatch();
    const { MyPostProps } = useSelector<StoreState, MyPostState>(
        (state) => state.MyPost
      );

return (
    <div className="container">
    {/* // <!-- 选项 --> */}
    <div className="position-relative">
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className="nav-link" href="profile.html">个人信息</a>
            </li>
            <li className="nav-item">
                <a className="nav-link active" href="my-post.html">我的帖子</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="my-reply.html">我的回复</a>
            </li>
        </ul>
        <a href="profile.html" className="text-muted position-absolute rt-0">返回个人主页&gt;</a>
    </div>
    {/* // <!-- 我的帖子 --> */}
    <div className="mt-4">
        <h6><b className="square"></b> 发布的帖子(93)</h6>
        <ul className="list-unstyled mt-4 pl-3 pr-3">
           
    
            <li className="border-bottom pb-3 mt-4">
                <div className="font-size-16 text-info">
                    <a href="#" className="text-info">备战春招，面试刷题跟他复习，一个月全搞定！</a>
                </div>
                <div className="mt-1 font-size-14">
                    金三银四的金三已经到了，你还沉浸在过年的喜悦中吗？
                    如果是，那我要让你清醒一下了：目前大部分公司已经开启了内推，正式网申也将在3月份陆续开始，金三银四，春招的求职黄金时期已经来啦！！！
                    再不准备，作为19应届生的你可能就找不到工作了。。。作为20届实习生的你可能就找不到实习了。。。
                    现阶段时间紧，任务重，能做到短时间内快速提升的也就只有算法了，
                    那么算法要怎么复习？重点在哪里？常见笔试面试算法题型和解题思路以及最优代码是怎样的？
                    跟左程云老师学算法，不仅能解决以上所有问题，还能在短时间内得到最大程度的提升！！！								
                </div>
                <div className="text-right font-size-12 text-muted">
                    赞 <i className="mr-3">11</i> 发布于 <b>2019-04-15 10:10:10</b>
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