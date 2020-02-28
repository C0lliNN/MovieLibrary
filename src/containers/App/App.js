import React from 'react';
import './App.module.css'
import Header from '../../components/Header/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieSearch from '../MovieSearch/MovieSearch';
import Footer from '../../components/Footer/Footer';
import {injectIntl} from 'react-intl'

const App = (props) => {

    document.title = props.intl.formatMessage({
      id: 'pageTitle',
      defaultMessage: 'Movie Library'
    });

    return (
      
      <main>
          
          <BrowserRouter>
      
            <Header />
            <Switch>
                <Route path="/movie/:id" component={MovieDetails}/>
                <Route path="/" component={MovieSearch}/>
            </Switch>
            
            <Footer />
      
          </BrowserRouter>
          
          
      </main>
      
    );
  

}

export default injectIntl(App);
