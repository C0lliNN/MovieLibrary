import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'
import {IntlProvider} from 'react-intl'

axios.defaults.baseURL = "https://api.themoviedb.org/3"

ReactDOM.render((
    <IntlProvider>
        <App /> 
    </IntlProvider>), 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
