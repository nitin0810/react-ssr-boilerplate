import React, { useState, useEffect,useContext } from 'react';
import fetch from 'isomorphic-unfetch';
import { Helmet } from 'react-helmet';

import SSRContext from '../../server/ssrContext';


const Home = (props) => {
  const ssrContext = useContext(SSRContext);
  console.log('ssrcontext inside Home',ssrContext)


  let initialData = null;
  if (ssrContext) {
    // SERVER SIDE HANDLING 
    // ssrContext is available only at server
    // now check if ssrContext.data(@type object) contains the data required for Home Component,
    // if yes, use the data to set the state, else set the 'Home' key in ssrContext.data to a promise which resolves in the required data
    if (ssrContext.data && ssrContext.data['Home']) {
      initialData = ssrContext.data['Home'];
    } else if (ssrContext.data) {
      ssrContext.data['Home'] = Home.resolveRequiredData();
    }
    // else ssrContext.data is null : This may be the case when the data required for app couldn't be resolved
    //  do nothing here, component may render to some static data or null
  } else {
    // CLIENT SIDE HANDLING 
    if (window.__INITIAL_DATA__ && window.__INITIAL_DATA__['Home']) {
      // if  window.__INITIAL_DATA__['Home'] available that means app is being hydrated by React
      // set the state using the data sent from server
      initialData = window.__INITIAL_DATA__['Home'];
      delete window.__INITIAL_DATA__['Home']; // not needed anymore
    } else {
      // here Home is being rendered by client via client side rendering, handle according to ur own logic
    }
  }

  // hooks
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const fetchRequiredData = () => {
    setLoading(true);
    Home.resolveRequiredData()
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        // do your error handling here
      });
  };

  useEffect(() => {
    if (!data) { fetchRequiredData(); }
  }, [])


  // console.log('Home props : ', props.ssrContext)
  // const ssrData = props.ssrContext ? props.ssrContext.homePage : window.__SERVER_DATA__.homePage;

  if (loading) {
    return <h3>Loading ...</h3>;
  }

  if (!data) {
    return null;
  }


  return (
    <div>
      <Helmet>
        <title>React SSR Boilerplate Home Page</title>
        <meta
          name="description"
          content="React SSR Boilerplate Home Page Description"
        />
      </Helmet>
      <h1>Home page</h1>
      <p>Hooks based component</p>
      <p>Look its code to check how to make a Hooks component compatible with SSR</p>
      <p>Verify in network tab that this page is server side rendered</p>
      <ol>
        <h4>Proquiz public quizzes : </h4>
        {data.data.quizzes.map(quiz => (
          <li key={quiz.id}>{quiz.title}</li>
        ))}
      </ol>


    </div>
  );
};

Home.resolveRequiredData = () => {


  return fetch('https://api.proquiz.com/data_stream/public-quizzes')
    .then(res => {
      if (res.ok) { return res; }
      return Promise.reject(res.statusText);
    })
    .then(res => res.json());

};

export default Home;
