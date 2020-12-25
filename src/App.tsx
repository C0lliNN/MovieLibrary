import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useFormatMessage } from 'react-intl-hooks';
import { Helmet } from 'react-helmet';
import MoviesContainer from './components/MoviesContainer/MoviesContainer';
import classes from './App.module.css';
import Menu from './components/Menu/Menu';

const App: React.FC = () => {
  const translate = useFormatMessage();

  return (
    <div className={classes.App}>
      <Helmet>
        <title>
          {translate({
            id: 'pageTitle',
            defaultMessage: 'Movie Library',
          })}
        </title>
      </Helmet>
      <BrowserRouter basename="/MovieLibrary">
        <main>
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

export default App;
