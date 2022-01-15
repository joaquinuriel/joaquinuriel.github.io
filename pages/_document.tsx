// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <meta name="description" content="Progressive Web App" />
          <meta name="apple-mobile-web-app-title" content="Web App" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />

          <link rel="manifest" href="manifest.json" />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/16px.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/32px.png"
          />
          <link
            rel="icon"
            type="image/ico"
            sizes="48x48"
            href="/icons/favicon.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="128x128"
            href="/icons/128x128.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/icons/192x192.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
