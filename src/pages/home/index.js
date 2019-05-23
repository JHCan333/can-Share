/**
 * @author 靳宏灿
 * @date 2019/5/22
 * @time 下午3:55
 * @Description: home 首页
 */
import React from 'react'
import { createHashHistory } from 'history'
import { $prefix } from '../../common'

const history = createHashHistory()

class Home extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            _html: 'Welcome !',
            cssName: {
                homePage: `${$prefix}_home_page`,
                mainFont: `${$prefix}_main_font`,
                headPortrait: `${$prefix}_head_portrait`,
                centerArea: `${$prefix}_center_area`,
                centerAreaGroup: `${$prefix}_center_area_group`,
            }
        }
    }

    handleClick (path) {
        history.push(path)
    }

    render () {
        let {homePage, centerArea, headPortrait, mainFont,centerAreaGroup} = this.state.cssName
        return (
            <div className={homePage}>
                <div className={centerArea}>
                    <div className={centerAreaGroup}>
                        <div className={headPortrait}  onClick={() => {this.handleClick('/blog')}}></div>
                        <div className={mainFont}>
                            愿经万种事，成万全人
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
