import React from 'react'
import { Layout } from 'antd'

const {Content} = Layout

class WebFrameContent extends React.Component {
    render () {
        return (
            <Content
                style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
            >
                {this.props.children}
            </Content>
        )
    }
}

export default WebFrameContent