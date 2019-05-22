import React, { Component } from "react";
import useStore from '../hooks/useStore.js';

class Hot extends Component{
    constructor(props){
        super(props);
        this.myref = React.createRef();
    }
    componentWillMount(){
        console.log(document.querySelector("#luo"));
        console.log(document.querySelector(".xiao"));
        console.log(window.document);
        
    }
    componentDidMount(){
        console.log(document.querySelector("#luo"));
        console.log(document.querySelector(".xiao"));
        console.log( "ref", this.myref );
        console.log( "ref",this.list2 );
        console.log( "ref",this.list3);
        console.log( "ref",this.list4);
        console.log( "ref",this.list5);
    }
    render(){
        
        return(<div id="luo" className="xiao">
            hot
            <List ref={ this.myref }></List>
            <List2  refs={ el=>{ this.list2 = el } }></List2>
            <List3 ref={ (el)=>{ this.list3 = el } } />
            <List4 ref={ (el)=>{ this.list4 = el }} />
            <List5  refs={ el=>{ this.list5 = el } }/>
        </div>);
    }
}

class List2 extends Component{
    render(){
        return (<div><input ref={ this.props.refs } type="text"/>></div>);
    }
}

const List = React.forwardRef((props, ref)=>{
    console.log("lsit", ref);
    return <div >
        <p ref={ref}>asdasd</p>
    </div>
})

const List3 = ()=>{
    return <div>1231</div>
}
class List4 extends Component{
    render(){
        return (<div><input type="text"/>></div>);
    }
}

const List5 = (props)=>{
    return <div >
        <p ref={ props.refs }>List5</p>
    </div>
}

export default Hot;