import React from 'react';
import './LazyA.scss';

const LazyA = (props) => {
  
  return (
    <div>
      <h1 className="title">Lazy A page</h1>
    <p>This page doesn't handle SSR</p>
    <p>This is just a lazy loaded component</p>
    </div>
  );
};

export default LazyA;
  