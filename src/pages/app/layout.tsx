import * as React from "react";
import {Header} from './Header'
import {Footer} from './Footer'
import { appActions } from '../../redux/actions/app';
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { useDispatch, useSelector} from "react-redux";
import { StoreState, appState } from "../../redux/reducers";
import {getCookieItem} from '../../utils'
import "./global.css"

interface LayoutProps extends RouteConfigComponentProps {}
export const Layout: React.SFC<LayoutProps> = (props) => {
    const dispatch = useDispatch();
   const token =  getCookieItem('token');
   const currentHref = window.location.href
   if(token==null && currentHref!=='#DiscussPost' && currentHref!=='#Register'){
     window.location.href='#login'
   }
    const { appProps } = useSelector<StoreState, appState>(
      (state) => state.app
    );
    const { route } = props;
    React.useEffect(() => {
      dispatch(appActions.getMenu());
    }, []);
    return (
    	<div className="nk-container">
        <Header {...props} />
            <div className="main">
           {route && renderRoutes(route.routes)}
            </div>
        <Footer />
    </div>   
    )
}





















//  export class Layout extends Component {
//     render() {
//         return (
//             <div>
                
//             </div>
//         )
//     }
// }
// export default connect(
//     state => ({
      
//     }),
//     {
       
//     }
// )(layout)
