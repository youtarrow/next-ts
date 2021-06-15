import React from "react";
import { InferGetStaticPropsType, NextPage } from "next";
import { infoData } from "types/microCmsData";
import Header from "components/Header";
import Footer from "components/Footer";
import Nav from "components/Nav";
import Layout from "components/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Style from "components/styles/contact.module.scss";

export type Props = {};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Success: NextPage<PageProps> = ({ info }) => {
  return (
    <div className="index">
      <Layout
        title={`Success | ${info[0].siteName}`}
        description={`Success | ${info[0].description}`}
        favicon={`${info[0].favicon.url}`}
      >
        <Header />
        <Nav value={4} />
        <div className="contact">
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" className={Style.inner}>
              <Typography
                component="div"
                style={{ textAlign: "center", padding: "30px" }}
              >
                お問い合わせありがとうございます。
              </Typography>
            </Container>
          </React.Fragment>
        </div>
        <Footer />
      </Layout>
    </div>
  );
};

export const getStaticProps = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.apiKeyCms as string },
  };

  const infoUrl = process.env.infoEndPoint as string;
  const info: infoData = await fetch(`${infoUrl}/`, key)
    .then((res) => res.json())
    .catch(() => null);

  return {
    props: {
      info: info.contents,
    },
  };
};

export default Success;
