import React from 'react'
import { Layout, Menu } from 'antd';
import {createHashHistory } from 'history'
import { $prefix } from '../../../common/index'

const history = createHashHistory()
const { Header} = Layout;
class WebFrameHeader extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            cssName: {
                blogHeader: `${$prefix}_blog_header`,
                blogHeaderMenu: `${$prefix}_blog_header_menu`,
            }
        }
    }

    handleClick(path){
        history.push( path)
    }
    render () {
        let {blogHeaderMenu,blogHeader} = this.state.cssName
        // 构建横向导航树
        let menuItemList = this.props.menuList.map((seg,idx)=>{
            return <Menu.Item key={idx} onClick={()=>{this.handleClick(seg.path)}}>{seg.title}</Menu.Item>
        })
        return (
            <Header className={blogHeader}>
                <Menu
                    mode="horizontal"
                    className={blogHeaderMenu}
                >
                    {menuItemList}
                </Menu>
            </Header>
        )
    }
}

export default WebFrameHeader