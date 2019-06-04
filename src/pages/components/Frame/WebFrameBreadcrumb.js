import React from 'react'
import {  Breadcrumb } from 'antd'

class WebFrameBreadcrumb extends React.Component {
    render () {
        return (
            <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}

export default WebFrameBreadcrumb