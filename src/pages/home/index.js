/**
 * @author 靳宏灿
 * @date 2019/5/22
 * @time 下午3:55
 * @Description: home 首页
 */
import React from 'react'
import { $prefix } from '../../common'
import {HeadGroup} from '../components'

class Home extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            cssName: {
                homePage: `${$prefix}_home_page`,
                centerArea: `${$prefix}_center_area`
            }
        }
    }

    render () {
        let {homePage, centerArea, headPortrait, mainFont,centerAreaGroup} = this.state.cssName
        return (
            <div className={homePage}>
                <div className={centerArea}>
                    <HeadGroup></HeadGroup>
                </div>
            </div>
        )
    }
}

export default Home
