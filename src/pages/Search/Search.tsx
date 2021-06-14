import * as React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import{SearchActions} from '../../redux/actions/Search'
import { useDispatch, useSelector } from "react-redux";
import { StoreState, SearchState } from "../../redux/reducers";
import { Pagination } from 'antd';
import moment from "moment"
export interface SearchPageProps extends RouteConfigComponentProps { }

export const SearchPage: React.SFC<SearchPageProps> = (props) => {
    const dispatch = useDispatch();
    const { SearchProps } = useSelector<StoreState, SearchState>(
        (state) => state.Search
      );
      const{page,size,DiscussPosts,total}=SearchProps
      const key = props.location.search.split('=')[1]
      React.useEffect(() => {
        dispatch(SearchActions.search(key,page,size));
        dispatch(SearchActions.searchNum(key))
      }, []);

return(
	<div className="container">
			<div className="container">
				<h6><b className="square"></b> 相关帖子</h6>
				{/* <!-- 帖子列表 --> */}
				<ul className="list-unstyled mt-4">
                    {
                        DiscussPosts.map((item)=>{
                            return(
                                <li className="media pb-3 pt-3 mb-3 border-bottom">
                                <img src={item.headerUrl} className="mr-4 rounded-circle" alt="用户头像"/>
                                <div className="media-body">
                                    <h6 className="mt-0 mb-3">
                                        <a href={"#DiscussPostDetail?postId="+item.id}> <div dangerouslySetInnerHTML = {{__html:item.title}} ></div></a>
                                    </h6>
                                    <div className="mb-3">
                                    <div dangerouslySetInnerHTML = {{__html:item.content}} ></div>
                                        
       
                                    </div>
                                    <div className="text-muted font-size-12">
                                        <u className="mr-3">{item.username}</u> 发布于 <b>{moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}</b>
                                        <ul className="d-inline float-right">
                                            <li className="d-inline ml-2">赞 {item.like}</li>
                                            <li className="d-inline ml-2">|</li>
                                            <li className="d-inline ml-2">回复 {item.replyNum}</li>
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
                <Pagination showQuickJumper total={total}
                            current={page}
                            showTotal={total => `Total ${total} items`}
                            onChange={(page, pageSize) => {
                                // 页面变化时需要进行传参，保证用户是想继续查看当前查询信息下的数据
                              
                               dispatch( SearchActions.updateProps({ page: page, size: pageSize }))
                               dispatch(SearchActions.search(key,page,size)) 
                            }
                            } />
					
				</nav>
			</div>
			</div>

)
}