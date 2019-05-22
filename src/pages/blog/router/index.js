/**
 * @author 靳宏灿
 * @date 2019/5/21
 * @time 上午10:14
 * @Description: 展示文章的路由
*/
import {getMenuList} from './menuList'
import MarkDownRender from '../../documents/markDownRender'
import React from 'react'
import {Route } from 'react-router'

let routeList = getMenuList().map(function(seg,idx){
    return <Route path={`${seg.path}`} key={idx} render={props => (<MarkDownRender markDownName={seg.name}/>)}/>
})

export default routeList