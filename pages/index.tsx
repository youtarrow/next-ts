import React from "react";
import Layout from "components/Layout";
import Header from "components/Header";
import Nav from "components/Nav";
import Blog from "components/Blog";

export default function Index() {
  return (
    <div className="index">
      <Layout title="Home | Next.js + TypeScript Example">
        <Header />
        <Nav />
        <Blog />
      </Layout>
    </div>
  );
}
