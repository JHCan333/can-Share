import React from 'react'
import marked from 'marked'
import hljs from 'highlight.js';
import $ from 'jquery'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {_html:'Welcome !'};
    }
    componentWillMount() {
        // marked相关配置
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
            highlight: function(code) {
                return hljs.highlightAuto(code).value;
            },
        });

    }
    componentDidMount() {
        fetch('./markDownFile/nrmOrder.md').then((res)=>{
            return res.text()
        }).then((val)=>{
            this.setState({_html:val})
        })
    }
    render () {
        return (
            <div dangerouslySetInnerHTML={{__html: marked(this.state._html)}}></div>
        )
    }
}

export default Game
