import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        return (
            <footer className="bg-dark">
			<div className="container">
				<div className="row">
					{/* <!-- 二维码 --> */}
					<div className="col-4 qrcode">
						<img src="https://uploadfiles.nowcoder.com/app/app_download.png" className="img-thumbnail" style={{width:'136px'}} />
					</div>
					{/* <!-- 公司信息 --> */}
					<div className="col-8 detail-info">
						<div className="row">
							<div className="col">
								<ul className="nav">
									<li className="nav-item">
										<a className="nav-link text-light" href="#">关于我们</a>
									</li>
									<li className="nav-item">
										<a className="nav-link text-light" href="#">加入我们</a>
									</li>
									<li className="nav-item">
										<a className="nav-link text-light" href="#">意见反馈</a>
									</li>
									<li className="nav-item">
										<a className="nav-link text-light" href="#">企业服务</a>
									</li>
									<li className="nav-item">
										<a className="nav-link text-light" href="#">联系我们</a>
									</li>
									<li className="nav-item">
										<a className="nav-link text-light" href="#">免责声明</a>
									</li>
									<li className="nav-item">
										<a className="nav-link text-light" href="#">友情链接</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<ul className="nav btn-group-vertical company-info">
									<li className="nav-item text-white-50">
										公司地址：浙江省西湖区浙江工业大学智能信息研究所
									</li>
									<li className="nav-item text-white-50">
										联系方式：18757155842(phone)&nbsp;&nbsp;&nbsp;&nbsp;2574049767@qq.com
									</li>
									<li className="nav-item text-white-50">
										ZJUT©2021 All rights reserved
									</li>
									<li className="nav-item text-white-50">
										京ICP备14055008号-4 &nbsp;&nbsp;&nbsp;&nbsp;
										<img src="http://static.nowcoder.com/company/images/res/ghs.png" style={{width:'18px'}} />
										京公网安备 11010502036488号
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
        )
    }
}
