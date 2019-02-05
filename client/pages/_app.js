import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import { makeStore } from '../store/store';
import Page from '../components/Page/Page';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
