import { default as NextDocument, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  public render() {
    return (
      <html>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/safari-pinned-tab.svg"
            color="#6699cc"
          />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="Accelerate" />
          <meta name="application-name" content="Accelerate" />
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <meta
            name="msapplication-config"
            content="/static/browserconfig.xml"
          />
          <meta name="theme-color" content="#6699cc" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
