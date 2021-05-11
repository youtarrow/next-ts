import React from "react";
import { UserData, infoData } from "types/microCmsData";
import { InferGetStaticPropsType, NextPage } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import Nav from "components/Nav";
import Layout from "components/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export type Props = {};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Portfolio: NextPage<PageProps> = ({ user, info }) => {
  console.log(user);

  return (
    <div className="index">
      <Layout
        title={`Portfolio | ${info[0].siteName}`}
        description={`Portfolio | ${info[0].description}`}
        favicon={`${info[0].favicon.url}`}
      >
        <Header />
        <Nav value={2} />
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="md">
            <Typography component="div">
              <h1>Portfolio</h1>
            </Typography>
          </Container>
        </React.Fragment>
        <Footer />
      </Layout>
    </div>
  );
};

export const getStaticProps = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.apiKeyCms as string },
  };
  const userUrl = process.env.userEndPoint as string;
  const user: UserData = await fetch(`${userUrl}/`, key)
    .then((res) => res.json())
    .catch(() => null);

  const infoUrl = process.env.infoEndPoint as string;
  const info: infoData = await fetch(`${infoUrl}/`, key)
    .then((res) => res.json())
    .catch(() => null);

  return {
    props: {
      user: user.contents,
      info: info.contents,
    },
  };
};

export default Portfolio;
