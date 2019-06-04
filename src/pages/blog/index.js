/**
 * @author 靳宏灿
 * @date 2019/5/22
 * @time 下午3:55
 * @Description: blog 主要页面
 */
import React from 'react'
import { Layout,Menu } from 'antd';
import { $prefix } from '../../common'

import {getMenuList} from './router/menuList'
import {WebFrameHeader,WebFrameLeftMenu,WebFrameBreadcrumb,WebFrameContent} from '../components/index'

import {PresentationPage,BlogPandect} from './components'


const {Sider} = Layout

class Blog extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            menuList:getMenuList(),
            cssName:{
                blogHome:`${$prefix}_blog_home`,
                blogArticle:`${$prefix}_blog_article`,
            }
        }
    }
    render () {
        let {blogHome,blogArticle } = this.state.cssName
        return (
            <section className={blogHome}>
                <WebFrameLeftMenu menuList={this.state.menuList}></WebFrameLeftMenu>,
                <div className={blogArticle}>
                    <WebFrameBreadcrumb></WebFrameBreadcrumb>
                    <WebFrameContent>
                        <PresentationPage></PresentationPage>
                    </WebFrameContent>
                </div>
                <BlogPandect/>
            </section>
        )
    }
}

export default Blog
