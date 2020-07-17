import React from 'react';
import './LazyB.scss';
import loadable from '@loadable/component'

// const LazyA = loadable(() => import(/* webpackPrefetch: true */ './LazyA.jsx'))
const LazyA = loadable(() => import( /* webpackChunkName: 'LazyA' */  './LazyA.jsx'))


const LazyB = (props) => {
  // const serverTodos = useServerData(data => {
  //   return data.todos || [];
  // });
  // const [text, setText] = useState('');
  // const [todos, setTodos] = useState(serverTodos);
  //   console.log('Home props : ',props.staticContext)
  // const ssrData = props.staticContext ? props.staticContext.homePage : window.__SERVER_DATA__.homePage;
  return (
    <div>
      <h1 className="title">Lazy B page</h1>
      <LazyA />
    </div>
  );
};

export default LazyB;
