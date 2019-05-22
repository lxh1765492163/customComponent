/*
 * @Description: 走马灯
 * @Author: luoxiaohong
 * @Date: 2019-05-21 10:20:21
 * @LastEditTime: 2019-05-22 14:20:33
 * @LastEditors: Please set LastEditors
 */

import React, {Component } from "react";
import PropTypes from 'prop-types';
import "./index.scss";


class CarouselCompMy extends  Component{
    constructor(props){
        super(props);

        this.state = {
            icurIndex:0, //当前下标
            leftVal:0, //swipper向做移动
            positionArr:[], //item每一个的transition位置
            transition:true, //过度时间控制
        };
    }

    static getDerivedStateFromProps(nextProps, nextState){
        return {
            ...nextProps
        };
    }

    componentWillUnmount(){
        clearTimeout(this.animateTimer);
    }

    componentDidMount(){
        let { swipper, initWidth, autoplay } = this.state;

        if( swipper.length <=1 ){
            return;
        }
        this._initposition(initWidth);
        autoplay && this._animate(initWidth);

    }
    componentDidUpdate( prveProps, prveState ){
        let {initWidth, swipper} = this.state;
        if( !prveState.swipper.length && swipper.length && initWidth  ){
            if( swipper.length <=1 ){
                return;
            }
            this._initposition(initWidth);
            this.state.autoplay && this._animate(initWidth);
            
            
        }
    }

    _initposition(initWidth){
        let { swipper } = this.state;
        let positionArr = swipper.map((one, index)=>{
            return initWidth*0;
        });
        this.setState({
            boxWidth:swipper.length*initWidth,
            positionArr
        });
    }

    _animate = (initWidth)=>{
        clearTimeout(this.animateTimer);
        let { itemTime } = this.state;

        this.animateTimer = setTimeout(()=>{
            let { icurIndex, swipper, positionArr, itemAnimate } = this.state;
            let leftVal;
                icurIndex = ++icurIndex%swipper.length;
                leftVal = -icurIndex*initWidth;

                if( this.contor ){
                    leftVal = -swipper.length*initWidth;
                    positionArr[0] = swipper.length*initWidth;;
                }else{
                    positionArr[0] = 0;
                }

            this.setState({
                icurIndex,
                leftVal,
                positionArr,
                transition:true
            }, ()=>{

                setTimeout(()=>{
                    if( icurIndex == swipper.length -1 ){
                        this.contor = true;
                        positionArr[0] = swipper.length*initWidth;
                        this.setState({
                            positionArr,
                        });
                       
                    }else{
                        this.contor = false;
                    }

                    if( icurIndex == 0 ){
                        positionArr[0] = 0;
                        this.setState({
                            leftVal:0,
                            positionArr,
                            transition:false
                        });
                    }
                    

                    this._animate(initWidth);
                }, itemAnimate);
            });

        }, itemTime);
        
    }

    _renderSwipperDouble = ()=>{
        let { swipper, icurIndex, dotStyle, dotActiveStyle } = this.state;
        let arr = [];

        let dotActiveStyleDefault = Object.assign({}, dotActiveStyle);
        let dotStyleDefault = Object.assign({}, dotStyle);

        swipper.map((one, index)=>{
            arr.push(<a className= { 
                icurIndex === index ?` swipperDouble-active swipperDouble` : "swipperDouble" } 
                style={icurIndex === index ?dotActiveStyleDefault:dotStyleDefault}
                key={index}></a>);
        });
        return <div className="swipperDoubleBox">{ arr }</div>;
    }


    _renderSwipper = ()=>{
        let { height } = this.state;
        let { swipper,  icurIndex, positionArr, leftVal, boxWidth, initWidth, transition, itemAnimate  } = this.state;
        let arr = [];

        swipper.map((one, index)=>{
            arr.push(<a 
                        className={ index == icurIndex ?"swipper-img":"swipper-img active"}
                        key={index}
                        style={{ 
                                height,
                                transform:`translateX(${positionArr[index]}px)`,
                                left:initWidth*index+"px",  width: initWidth, 
                                background: `url('https://zos.alipayobjects.com/rmsportal/${one.imgSrc}.png') center/cover no-repeat` }}>
                    </a>);
        });


        return <div 
                    id="carousel"
                    className="carousel-img"
                    style={{
                            width:boxWidth, 
                            transition:`all  ${transition? itemAnimate/1000+"s":"0s"} linear`,
                            transform:`translateX(${leftVal}px)`
                    }}>{ arr }</div>;
    }

    
    render(){
        let { height, dotS, className } = this.state;
        return (<div style={{height}} className={ className ? `${className} swipper`:"swipper" }>
                    <div className="my-carousel">
                        { this._renderSwipper() }
                        { dotS && this._renderSwipperDouble() }
                    </div>
                </div>);
    }
}


CarouselCompMy.defaultProps = {
    swipper:[],
    initWidth:document.documentElement.offsetWidth,
    height:0,
    dotStyle:{},
    dotActiveStyle:{},
    autoplay:false,
    itemTime:2000, //走马灯item切换到另一个的时间
    itemAnimate:1500 //每一个item入场动画时间
}

CarouselCompMy.propTypes = {
    className:PropTypes.string,
    initWidth: PropTypes.number.isRequired,
    height: PropTypes.number,
    autoplay:  PropTypes.bool,
    dotS:PropTypes.bool,
    dotStyle: PropTypes.object,
    dotActiveStyle: PropTypes.object,
    itemTime: PropTypes.number,
    itemAnimate: PropTypes.number,
    swipper: PropTypes.array
}

export default CarouselCompMy;