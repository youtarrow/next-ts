import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  favicon?: string;
};

const Layout = ({
  children,
  title = "This is the default title",
  description = "This is the default description",
  favicon = "/favicon.svg",
}: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={`${description}`} />
      <link rel="icon" type="image/svg+xml" href={`${favicon}`}></link>
    </Head>
    {children}
  </>
);

export default Layout;
