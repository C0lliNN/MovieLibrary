import React from 'react';
import './App.module.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MoviesContainer from './components/MoviesContainer/MoviesContainer';
import { injectIntl } from 'react-intl';
import Background from './components/UI/Background/Background';
import classes from './App.module.css';
import Menu from './components/Menu/Menu';

const App = (props) => {
  document.title = props.intl.formatMessage({
    id: 'pageTitle',
    defaultMessage: 'Movie Library',
  });

  return (
    <div>
      <Background />
      <BrowserRouter basename="/MovieLibrary">
        <main className={classes.App}>
          <Menu />
          <Switch>
            <Route path="/genre/:genre" component={MoviesContainer} exact />
            <Route path="/search/:query" component={MoviesContainer} />
            <Route path="/:filter" component={MoviesContainer} />
            <Route path="/" component={MoviesContainer} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default injectIntl(App);
