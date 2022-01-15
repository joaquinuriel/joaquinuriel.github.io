import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "src/layout";
import { styled } from "stitches.config";

// Home.displayName = "Home"
export default function Home() {
  const [event, setEvent] = useState<any>(null);
  useEffect(() => {
    addEventListener("beforeinstallprompt", setEvent);
  }, [event]);
  const install = async () => {
    if (!event) return;
    event.prompt();
    setEvent(null);
  };

  return (
    <Layout>
      <Head>
        <title>Joaquin Uriel - Web App dev</title>
      </Head>
      <h1 className='xl'>JoaquinUriel</h1>
      <h2>
        Web{" "}
        <Code style={{ cursor: event ? "pointer" : "auto" }} onClick={install}>
          &lt;App/&gt;
        </Code>{" "}
        developer
      </h2>
      <p>
        Hello There, <br />
        I&apos;m 17 years old and I love programing. <br />
        Based in Buenos Aires, Argentina. <br />
      </p>
    </Layout>
  );
}

const Code = styled("code", {});
