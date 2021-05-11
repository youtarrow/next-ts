import React from "react";
import { UserData, infoData } from "types/microCmsData";
import { InferGetStaticPropsType, NextPage } from "next";
import Layout from "components/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SiteTitle from "components/SiteTitle";
import TopMenu from "components/TopMenu";
import FooterNav from "components/FooterNav";
import Footer from "components/Footer";

export type Props = {
  title: string;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Index: NextPage<PageProps> = ({ user, info }) => {
  return (
    <div className="home" style={{ paddingTop: "50px" }}>
      <Layout
        title={`${info[0].siteName}`}
        description={`${info[0].description}`}
        favicon={`${info[0].favicon.url}`}
      >
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="md">
            <Typography component="div">
              <SiteTitle
                pageTitle={`${info[0].siteName}`}
                subTitle={info[0].subTitle}
                userImges={user[0].image.url}
              />
              <TopMenu />
            </Typography>
          </Container>
        </React.Fragment>
        <FooterNav />
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

export default Index;
