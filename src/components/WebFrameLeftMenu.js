import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { createHashHistory } from 'history'

const {SubMenu} = Menu
const {Sider} = Layout
const history = createHashHistory()
class WebFrameLeftMenu extends React.Component {
    handleClick(path){
        console.log('path',path)
        history.push( path)
    }
    render () {
        // 获取左侧的菜单列表
        let menuList = this.props.menuList
        let menuItemList = menuList.map((seg,idx)=>{
            return <Menu.Item key={idx} onClick={()=>{this.handleClick(seg.path)}}>{seg.name}</Menu.Item>
        })
        return (
            <Sider width={200} style={{background: '#fff'}}>
                <Menu
                    mode="inline"
                    style={{height: '100%', borderRight: 0}}
                >
                    {menuItemList}
                </Menu>
            </Sider>
        )
    }
}

export default WebFrameLeftMenu