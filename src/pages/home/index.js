/**
 * @author 靳宏灿
 * @date 2019/5/22
 * @time 下午3:55
 * @Description: home 首页
 */
import React from 'react'

class Home extends React.Component {
    constructor (props) {
        super(props)
        this.state = {_html: 'Welcome !'}
    }
    render () {
        return (
            <div >
                Welcome！
            </div>
        )
    }
}

export default Home
