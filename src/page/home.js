import React ,{Component } from 'react';
import config from "./config";

import "./css/home.scss";

//import useStore from '../hooks/useStore.js';
// export default function Home(props) {
//     const {
//         state, dispatch
//     } = useStore();

//     return (<div className="lxh-homepage">
//                 <div className="code-section"></div>
//                 <div className="mobile-section"></div>
//                 <div></div>
//                 <button onClick={ ()=>{ dispatch({type:"increase"}) }}>添加</button>
//                 <button onClick={ ()=>{dispatch({type:"decrease"})}}>减少</button>
//                 { state.num }
//                 <button onClick={ ()=>{ props.history.push("/about")} }>跳转</button>
//             </div>)
// }


class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            icurId:-1,
            icurModules:null
        }
    }


    _clickType = (one)=>{
        this.setState({icurId:one.id});
        this.setState({icurModules:one.component});
    }
    render(){
        let { icurModules, icurId } = this.state;
        return(<div className="lxh-homepage">
                    <div className="code-section">
                        {
                            config.map((one, index)=>(<div className={ icurId === one.id?"aside-active aside-one":"aside-one"} key="id" onClick={()=>{ this._clickType(one) }}>{one.type}</div>))
                        }
                    </div>
                    <div className="mobile-section">
                        {
                            icurModules?icurModules:<div className="no-data">没数据</div>
                        }
                    </div>
                    <div></div>
                </div>);
    }
}
export default Home;