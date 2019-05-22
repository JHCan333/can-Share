/**
 * @author 靳宏灿
 * @date 2019/5/22
 * @time 下午3:55
 * @Description: blog 主要页面
 */
import React from 'react'
import { Layout,Menu } from 'antd';
import PresentationPage from './PresentationPage'
import {getMenuList} from './router/menuList'
import {WebFrameHeader,WebFrameLeftMenu,WebFrameBreadcrumb,WebFrameContent} from '../../components/index'

class Index extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            menuList:getMenuList()
        }
    }
    render () {
        return (
            <Layout>
                <WebFrameLeftMenu menuList={this.state.menuList}></WebFrameLeftMenu>,
                <Layout style={{padding: '0 24px 24px'}}>
                    <WebFrameBreadcrumb></WebFrameBreadcrumb>
                    <WebFrameContent>
                        <PresentationPage></PresentationPage>
                    </WebFrameContent>
                </Layout>
            </Layout>
        )
    }
}

export default Index
