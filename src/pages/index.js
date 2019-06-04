/**
 * @author 靳宏灿
 * @date 2019/5/22
 * @time 下午3:55
 * @Description: 项目的布局
 */
import React from 'react'
import { Layout } from 'antd'
import { WebFrameHeader } from './components/index'
import { Router, Route, IndexRoute } from 'react-router'
import { createHashHistory } from 'history'
import Home from './home/index'
import Blog from './blog/index'
import menuList from './router/menuList'
import { $prefix } from '../common'

const history = createHashHistory()

class WebFrame extends React.Component {
    render () {
        return (
            <section className={`${$prefix}_page_home`}>
                <Router history={history}>
                    <Route path={'/'} exact={true} key={0} render={props => (<Home/>)}/>
                    <Route path={'/home'} key={1} render={props => (<Home/>)}/>
                    <Route path={'/blog'} key={2} render={props => (
                        [<WebFrameHeader key='a' menuList={menuList}></WebFrameHeader>,
                            <Blog key={'b'}/>]
                    )}></Route>
                    <Route path={'/wait'} key={3} render={props => (<Home/>)}/>
                </Router>
            </section>
        )
    }
}

export default WebFrame