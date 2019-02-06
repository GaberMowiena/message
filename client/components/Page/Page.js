import { injectGlobal } from 'styled-components';
import React, { Component } from 'react';

import Meta from '../Meta/Meta';
import { PageWrapper, Inner } from './styles/PageStyles';

injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 10px;
    height: 100%;
    width: 100%;

  }
  * *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    height: 100%;
    width: 100%;

  }
  a {
    text-decoration:none;
    color: black;
  }
`;

class Page extends Component {
  render() {
    return (
      <PageWrapper>
        <Meta />
        <Inner>{this.props.children}</Inner>
      </PageWrapper>
    );
  }
}

export default Page;
