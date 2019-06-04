import React from 'react'
import { Layout } from 'antd'

const {Content} = Layout

class WebFrameContent extends React.Component {
    render () {
        return (
            <div
            >
                {this.props.children}
            </div>
        )
    }
}

export default WebFrameContent