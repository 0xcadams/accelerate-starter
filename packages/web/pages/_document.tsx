import { default as NextDocument, Head, Main, NextScript } from 'next/document';
import * as React from 'react';
import server from 'styled-jsx/server';

class Document extends NextDocument {
  public render() {
    return (
      <html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6699cc" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta
            name="apple-mobile-web-app-title"
            content="Accelerate Starter"
          />
          <meta name="application-name" content="Accelerate Starter" />
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="theme-color" content="#202020" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta charSet="utf-8" />

          <noscript>You need to enable JavaScript to run this app.</noscript>

          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

Document.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  let pageContext;
  const page = ctx.renderPage((Component) => {
    const WrappedComponent = (props) => {
      pageContext = props.pageContext;
      return <Component {...props} />;
    };

    return WrappedComponent;
  });

  let css;
  // It might be undefined, e.g. after an error.
  if (pageContext) {
    css = pageContext.sheetsRegistry.toString();
  }

  return {
    ...page,
    pageContext,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: css }} />
        {server() || null}
      </React.Fragment>
    )
  };
};

export default Document;
