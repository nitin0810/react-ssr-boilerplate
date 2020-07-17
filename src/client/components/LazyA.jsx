import React from 'react';
import './LazyA.scss';

const LazyA = (props) => {
  // const serverTodos = useServerData(data => {
  //   return data.todos || [];
  // });
  // const [text, setText] = useState('');
  // const [todos, setTodos] = useState(serverTodos);
//   console.log('Home props : ',props.staticContext)
// const ssrData = props.staticContext ? props.staticContext.homePage : window.__SERVER_DATA__.homePage;
  return (
    <div>
      <h1 className="title">Lazy A page</h1>
    </div>
  );
};

export default LazyA;
  