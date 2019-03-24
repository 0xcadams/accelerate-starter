import { AppComponentContext, Container, default as App } from 'next/app';
import { default as Head } from 'next/head';
import * as React from 'react';

import nextReduxWrapper from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import mobileDetect from 'mobile-detect';
import { Responsive } from 'semantic-ui-react';

import { Layout } from '@Components/Layout';
import store from '@Redux/store';

import 'semantic-ui-css/semantic.min.css';

const getWidthFactory = (isMobileFromSSR: boolean) => (): number => {
  const isSSR: boolean = typeof window === 'undefined';
  const ssrValue: number = isMobileFromSSR
    ? Number(Responsive.onlyMobile.maxWidth || 0)
    : Number(Responsive.onlyTablet.minWidth || 0);

  return isSSR ? ssrValue : window.innerWidth;
};

interface IProps extends React.Props<{}> {
  isMobileFromSSR: boolean;
  store: Store;
}

class GlobalApp extends App<IProps> {
  public static async getInitialProps({ Component, ctx }: AppComponentContext) {
    let pageProps: object = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const md: MobileDetect = new mobileDetect(
      (ctx.req && ctx.req.headers['user-agent']) || ''
    );
    const isMobileFromSSR: boolean = Boolean(md.mobile());

    return {
      isMobileFromSSR,
      pageProps,
      deviceInfo: {
        mobile: md.mobile(),
        os: md.os(),
        tablet: md.tablet(),
        userAgent: md.userAgent()
      }
    };
  }

  public render(): JSX.Element {
    const { Component, isMobileFromSSR, pageProps, store } = this.props;

    return (
      <Container>
        <Head>
          <title>Accelerate Starter</title>
        </Head>
        <Provider store={store}>
          <Layout getWidth={getWidthFactory(isMobileFromSSR)}>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default nextReduxWrapper(store)(GlobalApp);
