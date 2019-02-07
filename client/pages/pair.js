import React, { Component } from 'react';

import AuthNav from '../components/AuthNav/AuthNav';
import Pair from '../components/Pair/Pair';

class PairPage extends Component {
  render() {
    return (
      <div>
        <AuthNav />
        <Pair />
      </div>
    );
  }
}

export default PairPage;
