import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import Head from './components/Head';

import About from './components/about/About';
import Home from './components/Home';
import NotFoundPage from './components/NotFoundPage.jsx';


import loadable from '@loadable/component'

const LazyA = loadable(() => import(/* webpackChunkName: 'LazyA' */ './components/LazyA.jsx'))
const LazyB = loadable(() => import( /* webpackChunkName: 'LazyB' */  './components/LazyB.jsx'))



const App = () => {

  return <div className="app">
    <Head />

    <nav aria-label="main navigation">
      <NavLink exact to="/" activeClassName="active">
        Home
      </NavLink>{' '}
      <NavLink exact to="/about" activeClassName="active">
        About
      </NavLink>{' '}
      <NavLink exact to="/LazyA" activeClassName="active">
        LazyA
      </NavLink>{' '}
      <NavLink exact to="/LazyB" activeClassName="active">
        LazyB
      </NavLink>
    </nav>

    <main className="main">
      <Switch>
        {/* <Route exact path="/" component={LoadableHome} /> */}
        <Route path="/about" exact component={About} />
        <Route path="/" exact component={Home} />
        <Route path="/LazyA" exact component={LazyA} />
        <Route path="/LazyB" exact component={LazyB} />
        <NotFoundPage/>

      </Switch>
    </main>

    <footer />
  </div>
};

export default App;
