/**
 * @author 靳宏灿
 * @date 2019/5/22
 * @time 下午3:54
 * @Description: 文章展示页
 */
import React from 'react'
import $ from 'jquery'
import RouteList from './router'
import { Router } from 'react-router'
import {createHashHistory } from 'history'

const history = createHashHistory()

class PresentationPage extends React.Component {
    constructor (props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.state = {_html: 'Welcome !'}
    }
    handleClick(path){
        history.push( path)
    }
    render () {
        return (
            <Router history={history}>
                {RouteList}
            </Router>
        )
    }
}

export default PresentationPage
