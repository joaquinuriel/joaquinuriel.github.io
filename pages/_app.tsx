import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
// import App from "next/app";
import Head from "next/head";
import "styles/globals.sass";

export default function MyApp({ Component, pageProps }: AppProps) {
  console.log("displayName: ", Component.displayName);
  return (
    <ThemeProvider>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, viewport-fit=contain'
        />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };
