import React from 'react';
import './LazyB.scss';
import loadable from '@loadable/component'
import { Helmet } from 'react-helmet';

const LazyA = loadable(() => import( /* webpackChunkName: 'LazyA' */  './LazyA.jsx'))


export default class LazyB extends React.Component {
  constructor(props) {
    super(props);
    const { staticContext } = props;

    let initialData = null;
    if (staticContext ) {
      // SERVER SIDE HANDLING 
      // staticContext is available only at server
      // now check if staticContext.data(@type object) contains the data required for Home Component,
      // if yes, use the data to set the state, else set the 'LazyB' key in staticContext.data to a promise which resolves in the required data
      if (staticContext.data && staticContext.data['LazyB']) {
        initialData = staticContext.data['LazyB'];
      } else if(staticContext.data ){
        staticContext.data['LazyB'] = LazyB.resolveRequiredData();
      }
      // else staticContext.data is null : This may be the case when the data required for app couldn't be resolved
      //  do nothing here, component may render to some static data or null
    } else {
      // CLIENT SIDE HANDLING 
      if (window.__INITIAL_DATA__ && window.__INITIAL_DATA__['LazyB']) {
        // if  window.__INITIAL_DATA__['LazyB'] available that means app is being hydrated by React
        // set the state using the data sent form server
        initialData = window.__INITIAL_DATA__['LazyB'];
        delete window.__INITIAL_DATA__['LazyB'];
      } else {
        // here LazyB is being rendered by client via client side rendering, handle according to ur own logic
      }
    }

    this.state = {
      loading: false,
      data: initialData
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

  render() {

    if (this.state.loading) {
      return <h3>Loading ...</h3>;
    }

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

