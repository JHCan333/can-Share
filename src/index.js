import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import antCss from  'antd/dist/antd.css'
import WebFrame from './pages/index';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<WebFrame />, document.getElementById('root'));

serviceWorker.unregister();
