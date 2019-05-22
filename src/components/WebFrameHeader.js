import React from 'react'
import { Layout, Menu } from 'antd';
import {createHashHistory } from 'history'

const history = createHashHistory()
const { Header} = Layout;
class WebFrameHeader extends React.Component {
    handleClick(path){
        history.push( path)
    }
    render () {
        // 构建横向导航树
        let menuItemList = this.props.menuList.map((seg,idx)=>{
            return <Menu.Item key={idx} onClick={()=>{this.handleClick(seg.path)}}>{seg.title}</Menu.Item>
        })
        return (
            <Header >
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{lineHeight: '64px'}}
                >
                    {menuItemList}
                </Menu>
            </Header>
        )
    }
}

export default WebFrameHeader