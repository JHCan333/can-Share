/**
 * @author 靳宏灿
 * @date 2019/5/21
 * @time 上午10:14
 * @Description: 导出路由list
*/
import menuList from './menuList'
import MarkDownRender from '../pages/documents/markDownRender'
import React from 'react'
import {Route } from 'react-router'

let routeList = menuList.map(function(seg,idx){
    return <Route path={seg.path} key={idx} render={props => (<MarkDownRender markDownName={seg.name}/>)}/>
})

export default routeList