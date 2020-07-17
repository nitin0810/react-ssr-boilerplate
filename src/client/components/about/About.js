import React, { Component } from 'react';

import { imagePath } from '../../utils/assetUtils';
// import './about.scss';
import styles from './about.module.scss';

class About extends Component {





  render() {
    const ssrData = this.props.staticContext ? this.props.staticContext.aboutPage : window.__SERVER_DATA__.aboutPage;

    return (
      <div>
        {/* <h1 className={'title'}>About page</h1>
        <img className={'react-logo'} src={imagePath('react.svg')} alt="" /> */}
        <h1 className={styles.title}>About page</h1>
        <img className={styles.reactLogo} src={imagePath('react.svg')} alt="" />
        <ul>
          <li >a : {ssrData.a}</li>
          <li >b : {ssrData.b}</li>
        </ul>
      </div>
    );
  }
}

export default About;
