/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-22 10:47:08
 * @LastEditTime: 2019-05-22 14:18:42
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import Carousel from "../components/carousel";

export default [
    {
        type:"走马灯",
        id:0,
        component: <Carousel 
                        initWidth={ 375 }
                        height={ 200 }
                        autoplay
                        dotS
                        dotActiveStyle={{background:"blue"}}
                        swipper={[{
                                        imgSrc:"AiyWuByWklrrUDlFignR", 
                                        imgTarget:"2"
                                    }, 
                                    {
                                        imgSrc:"TekJlZRVCjLFexlOCuWn", 
                                        imgTarget:"4"
                                    }]}/>,
    },

];