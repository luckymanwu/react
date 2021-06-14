import * as React from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { StoreState,StatisticsState} from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import {getCookieItem} from '../../utils'
import { StatisticsActions } from '../../redux/actions/Statistics'
export interface StatisticsProps extends RouteConfigComponentProps {}
export const StatisticsPage: React.SFC<StatisticsProps> = (props) => {
	const userId = getCookieItem('userId');
    const dispatch = useDispatch();
    const { StatisticsProps } = useSelector<StoreState, StatisticsState>(
        (state) => state.Statistics
      );
	  const{UV,DAU,start,end} = StatisticsProps
return(
    <div>
    {/* // <!-- 网站UV --> */}
			<div className="container pl-5 pr-5 pt-3 pb-3 mt-3">
				<h6 className="mt-3"><b className="square"></b> 网站 UV</h6>
				<form className="form-inline mt-3">
					<input onChange={(e)=>{
						dispatch(StatisticsActions.updateProps({
							start:e.target.value
						}))
					}}
					 type="date" className="form-control" required/>
					<input onChange={(e)=>{
						dispatch(StatisticsActions.updateProps({
							end:e.target.value
						}))
					}}type="date" className="form-control ml-3" required/>
					<button onClick={()=>{
						dispatch(StatisticsActions.getUV(start,end))

					}}
					 type="button" className="btn btn-primary ml-3">开始统计</button>
				</form>
				<ul className="list-group mt-3 mb-3">
					<li className="list-group-item d-flex justify-content-between align-items-center">
						统计结果
						<span className="badge badge-primary badge-danger font-size-14">{UV}</span>
					</li>
				</ul>
			</div>
			{/* // <!-- 活跃用户 --> */}
			<div className="container pl-5 pr-5 pt-3 pb-3 mt-4">
				<h6 className="mt-3"><b className="square"></b> 活跃用户</h6>
				<form className="form-inline mt-3">
					<input onChange={(e)=>{
						dispatch(StatisticsActions.updateProps({
							start:e.target.value
						}))
					}}
					 type="date" className="form-control" required/>
					<input onChange={(e)=>{
						dispatch(StatisticsActions.updateProps({
							end:e.target.value
						}))
					}}
					type="date" className="form-control ml-3" required/>
					<button onClick={()=>{
						dispatch(StatisticsActions.getDAU(start,end))
					}}
					type="button" className="btn btn-primary ml-3">开始统计</button>
				</form>
				<ul className="list-group mt-3 mb-3">
					<li className="list-group-item d-flex justify-content-between align-items-center">
						统计结果
						<span className="badge badge-primary badge-danger font-size-14">{DAU}</span>
					</li>
				</ul>
			</div>
         </div>				
)
}