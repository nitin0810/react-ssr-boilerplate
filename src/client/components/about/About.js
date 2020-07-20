import React, { Component } from 'react';

import { imagePath } from '../../utils/assetUtils';
import './about.scss';

class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading:true
    };
  }

  componentDidMount(){
    this.getRequiredData();
  }

  getRequiredData(){
    this.setState({loading:true});
    setTimeout(() => {
      this.setState({
        loading:false,
        data:{a:21,b:22}
      });
    }, 1000);
  }

  render() {

    if(this.state.loading){
      return <h3>Loading ...</h3>;
    }

    return (
      <div>
        <h1 className={'title'}>About page</h1>
        <p>This page does not handle SSR</p>
        <img className={'react-logo'} src={imagePath('react.svg')} alt="" />
        <ul>
          <li >a : {this.state.data.a}</li>
          <li >b : {this.state.data.b}</li>
        </ul>
      </div>
    );
  }
}

export default About;
