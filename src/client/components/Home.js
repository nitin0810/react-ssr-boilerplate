import React, { useState } from 'react';

import { api } from '../api';
// import { useServerData } from '../state/serverDataContext';
import loadable from '@loadable/component'


// import(/* webpackPrefetch: true */ './LazyA.jsx')
// .then(({ default: LazyA }) => {
//   A = LazyA;
// })

const Home = (props) => {
  // const serverTodos = useServerData(data => {
  //   return data.todos || [];
  // });
  // const [text, setText] = useState('');
  // const [todos, setTodos] = useState(serverTodos);
  console.log('Home props : ', props.staticContext)
  const ssrData = props.staticContext ? props.staticContext.homePage : window.__SERVER_DATA__.homePage;



  return (
    <div>
      <h1>Home page</h1>

      <ul>
        <li >a : {ssrData.a}</li>
        <li >b : {ssrData.b}</li>
      </ul>


    </div>
  );
};

Home.fetchData = () => {
  return api.todos.all().then(todos => {
    return {
      todos
    };
  });
};

export default Home;
