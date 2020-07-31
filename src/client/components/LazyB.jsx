import React from 'react';
import './LazyB.scss';
import loadable from '@loadable/component'
import { Helmet } from 'react-helmet';

import SSRContext from '../../server/ssrContext';


const LazyA = loadable(() => import( /* webpackChunkName: 'LazyA' */  './LazyA.jsx'))

/**
 * Using SSRContext data is little difficult in class components. 
 * Hence it is recommended to use Hooks/Funtional components in this case.
 */
export default class LazyB extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: null
    }
  }


  static resolveRequiredData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = { a: 11, b: 12 };
        resolve(data);
      }, 500);
    });
  }

  componentDidMount() {
    if (!this.state.data) {
      this.fetchRequiedData();
    }
  }

  fetchRequiedData() {
    this.setState({ loading: true });
    LazyB.resolveRequiredData()
      .then(data => {
        this.setState({
          loading: false,
          data: data
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  }

  getSSRState() {
    // data from SSRContext is not available inside constructor
    // it can be accessed in render method and lifecycle methods
    let initialData = null;
    const ssrContext = this.context;
    if (ssrContext) {
      // SERVER SIDE HANDLING 
      // ssrContext is available only at server
      // now check if ssrContext.data(@type object) contains the data required for Home Component,
      // if yes, use the data to set the state, else set the 'LazyB' key in ssrContext.data to a promise which resolves in the required data
      if (ssrContext.data && ssrContext.data['LazyB']) {
        initialData = ssrContext.data['LazyB'];
      } else if (ssrContext.data) {
        ssrContext.data['LazyB'] = LazyB.resolveRequiredData();
      }
      // else ssrContext.data is null : This may be the case when the data required for app couldn't be resolved
      //  do nothing here, component may render to some static data or null
    } else {
      // CLIENT SIDE HANDLING (ssrContext is null here, check : index.js file)
      if (window.__INITIAL_DATA__ && window.__INITIAL_DATA__['LazyB']) {
        // if  window.__INITIAL_DATA__['LazyB'] available that means, app is being hydrated by React
        // set the state using the data sent from server along with html page
        initialData = window.__INITIAL_DATA__['LazyB'];
        delete window.__INITIAL_DATA__['LazyB'];
      } else {
        // here LazyB is being rendered by client via client side rendering, handle according to ur own logic
      }
    }
    return initialData;
  }

  render() {
    console.log('ssrcontext inside lazyb Render', this.context)

    if (this.state.loading) {
      return <h3>Loading ...</h3>;
    }
    // Since context is not available in constructor, hence we somehow need to set our initialState from the SSRContext
    // in the render method only
    // below line handles all the cases, CSR,SSR, hydrate
    // you can tweak according to ur own logic
    this.state.data = this.state.data === null ? this.getSSRState() : this.state.data;

    if (!this.state.data) {
      return null;
    }

    return (
      <div>
        <Helmet>
          <title>React SSR Boilerplate LazyB Page</title>
          <meta
            name="description"
            content="React SSR Boilerplate LazyB Page Description"
          />
        </Helmet>
        <h1 className="title">Lazy B page</h1>
        <p>Class based component</p>
        <p>Look its code to check how to make a class component compatible with SSR</p>
        <p>This component used a fake request to prefetcht the data at server which resolved in 2sec</p>
        <p>Uses LazyA component within it</p>
        <ul>
          <li >a : {this.state.data.a}</li>
          <li >b : {this.state.data.b}</li>
        </ul>
        <LazyA />
      </div>
    );
  }
}

LazyB.contextType = SSRContext;

