import React from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
// import Loadable from 'react-loadable';

import Head from './components/Head';

import About from './components/about/About';
import Home from './components/Home';


// const LoadableHome = Loadable({
//   loader: () => import(/* webpackChunkName: 'home' */ './components/Home'),
//   loading: () => <div>Loading...</div>
// });

// const LoadableAbout = Loadable({
//   loader: () => import(/* webpackChunkName: 'about' */ './components/about/About'),
//   loading: () => <div>Loading...</div>
// });

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
        <Redirect to="/" />

      </Switch>
    </main>

    <footer />
  </div>
};

export default App;
