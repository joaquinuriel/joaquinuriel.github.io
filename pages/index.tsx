import Head from "next/head";
import Layout from "src/layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Hello world</title>
      </Head>
      <h1>Home</h1>
      <p>Hello World</p>
    </Layout>
  );
}
