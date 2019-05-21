import React from 'react'
import $ from 'jquery'
import RouteList from '../router'
import { Router } from 'react-router'
import {createHashHistory } from 'history'

const history = createHashHistory()

class Home extends React.Component {
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
            <div>
                <div onClick={()=>{this.handleClick('/nrmOrder')}}>nrmOrder</div>
                <div onClick={()=>{this.handleClick('/browserRender')}}>browserRender</div>
                <Router history={history}>
                    {RouteList}
                </Router>
            </div>
        )
    }
}

export default Home
