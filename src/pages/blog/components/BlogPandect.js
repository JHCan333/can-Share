import React from 'react'
import { Layout } from 'antd';
import { $prefix } from '../../../common'
import {HeadGroup} from '../../components'

const {Sider} = Layout

class BlogPandect extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            cssName:{
                blogPandect:`${$prefix}_blog_pandect`
            }
        }
    }
    render () {
        let {blogPandect} = this.state.cssName
        return (
            <div className={blogPandect}>
                <HeadGroup></HeadGroup>
            </div>
        )
    }
}

export default BlogPandect